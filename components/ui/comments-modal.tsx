'use client';

import { useState } from 'react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://daily-news-5k66.onrender.com/news/written/${newsId}/comment/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Comments</h3>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-lg p-2 min-h-[100px]"
            placeholder="Write your comment..."
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
