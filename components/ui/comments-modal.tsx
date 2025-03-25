'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import IdModal from './id-modal';

interface Comment {
  id: number;
  text: string;
  created_at: string;
}

interface CommentsModalProps {
  newsId: number;
  initialComments: Comment[];
  onClose: () => void;
}

export default function CommentsModal({
  newsId,
  initialComments,
  onClose,
}: CommentsModalProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [showIdModal, setShowIdModal] = useState(false);
  const [id, setId] = useState('');
  const [pendingComment, setPendingComment] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    if (storedId) {
      setId(storedId);
    }
  }, []);

  const handleAction = async () => {
    if (!id) {
      setPendingComment(newComment);
      setShowIdModal(true);
      return;
    }

    await handleComment();
  };

  const handleComment = async () => {
    try {
      const response = await fetch(
        `https://daily-news-5k66.onrender.com/news/written/${newsId}/comment/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: newComment,
            user_id: id,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setComments([...comments, data]);
        setNewComment('');
        toast.success(data.message || 'Comment posted successfully');
      } else {
        toast.error(data.error || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Something went wrong while posting the comment');
    }
  };

  const handleIdSubmit = (newId: string) => {
    localStorage.setItem('myId', newId);
    setId(newId);
    setShowIdModal(false);

    if (pendingComment) {
      setNewComment(pendingComment);
      setPendingComment('');
      handleComment();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b py-3">
              <p className="text-gray-700">{comment.text}</p>
              <span className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAction();
          }}
          className="space-y-4"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-lg p-2 min-h-[100px]"
            placeholder="Write your comment..."
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Post Comment
            </button>
          </div>
        </form>

        <IdModal
          isOpen={showIdModal}
          onClose={() => {
            setShowIdModal(false);
            setPendingComment('');
          }}
          onSubmit={handleIdSubmit}
        />
      </div>
    </div>
  );
}
