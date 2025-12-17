'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import IdModal from './id-modal';
import {
  User,
  ArrowRight,
  LucideKey,
  Heart,
  Send,
  Bookmark,
} from 'lucide-react';

interface EngagementButtonsProps {
  url: string;
  newsId: number;
  initialLikes: number;
  initialShares: number;
  initialBookmarks?: number;
  content_type?: string;
  Platform?: string;
}

export default function EngagementButtons({
  url,
  newsId,
  initialLikes,
  initialShares,
  initialBookmarks = 0,
  content_type = 'written',
  Platform = 'X',
}: EngagementButtonsProps) {
  const [idModal, setIdModal] = useState(false);
  const [id, setId] = useState('');
  const [likes, setLikes] = useState(initialLikes);
  const [shares, setShares] = useState(initialShares);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [pendingAction, setPendingAction] = useState<
    'like' | 'share' | 'bookmark' | null
  >(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    if (storedId) {
      setId(storedId);
    }
  }, []);

  useEffect(() => {
    // Check if user has bookmarked when component mounts
    const checkBookmarkStatus = async () => {
      if (!id) return;

      try {
        // ❌ OLD CODE - GET request with body causes error:
        // const response = await fetch(`${url}/${newsId}/bookmark/`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
        //   },
        //   body: JSON.stringify({
        //     user_id: id,
        //     content_id: `${newsId}`,
        //     content_type: content_type,
        //   }),
        // });

        // ✅ NEW CODE - Use URL parameters for GET request:
        const params = new URLSearchParams({
          user_id: id,
          content_id: `${newsId}`,
          content_type: content_type,
        });
        
        const response = await fetch(`${url}/${newsId}/bookmark/?${params}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
          },
          // No body for GET requests
        });

        if (response.ok) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };

    checkBookmarkStatus();
  }, [id, newsId, url, content_type]);

  useEffect(() => {
    if (id) {
      const bookmarkedArticles = JSON.parse(
        localStorage.getItem('bookmarkedArticles') || '[]'
      );
      setIsBookmarked(bookmarkedArticles.includes(newsId));
    }
  }, [id, newsId]);

  const handleAction = async (action: 'like' | 'share' | 'bookmark') => {
    if (!id) {
      setPendingAction(action);
      setIdModal(true);
      return;
    }

    if (action === 'like') {
      await handleLike();
    } else if (action === 'share') {
      await handleShare();
    } else {
      await handleBookmark();
    }
  };

  const handleIdSubmit = (newId: string) => {
    localStorage.setItem('myId', newId);
    setId(newId);

    if (pendingAction) {
      handleAction(pendingAction);
      setPendingAction(null);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${url}/${newsId}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
        },
        body: JSON.stringify({ user_id: id, content_id: newsId }),
      });
      const data = await response.json();

      if (response.ok) {
        setLikes((prev) => prev + 1);
        toast.success(data.message || 'Article liked successfully');
      } else {
        toast.error(data.error || 'Failed to like article');
      }
    } catch (error) {
      console.error('Error liking news:', error);
      toast.error('Something went wrong while liking the article');
    }
  };

  const handleShare = async () => {
    const link = `${url}/${newsId}`;
    await navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
    try {
      const response = await fetch(`${url}/${newsId}/share/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
        },
        body: JSON.stringify({ user_id: id, Platform: 'X' }),
      });
      const data = await response.json();

      if (response.ok) {
        setShares((prev) => prev + 1);
        toast.success(data.message || 'Article shared successfully');
      } else {
        toast.error(data.error || 'Failed to share article');
      }
    } catch (error) {
      console.error('Error sharing news:', error);
      toast.error('Something went wrong while sharing the article');
    }
  };

  const handleBookmark = async () => {
    console.log({
      userId: id,
      content_id: newsId,
      content_type,
    });
    try {
      const response = await fetch(`${url}/${newsId}/bookmark/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
        },
        body: JSON.stringify({
          user_id: id,
          content_id: newsId,
          content_type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookmarks((prev) => prev + 1);
        setIsBookmarked(true);
        toast.success(data.message || 'Article bookmarked successfully');

        // Store in localStorage
        const bookmarkedArticles = JSON.parse(
          localStorage.getItem('bookmarkedArticles') || '[]'
        );
        if (!bookmarkedArticles.includes(newsId)) {
          bookmarkedArticles.push(newsId);
          localStorage.setItem(
            'bookmarkedArticles',
            JSON.stringify(bookmarkedArticles)
          );
        }
      } else {
        toast.error(data.error || 'Failed to bookmark article');
      }
    } catch (error) {
      console.error('Error bookmarking news:', error);
      toast.error('Something went wrong while bookmarking the article');
    }
  };

  return (
    <>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <button
          onClick={() => handleAction('like')}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <span className="flex items-center gap-1">
            <Heart size={28} /> {likes}
          </span>
        </button>
        <button
          onClick={() => handleAction('share')}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <span className="flex items-center gap-1">
            <Send size={28} /> {shares}
          </span>
        </button>
        <button
          onClick={() => handleAction('bookmark')}
          className={`flex items-center gap-1 transition-colors ${
            isBookmarked ? 'text-primary' : 'hover:text-primary'
          }`}
        >
          <span className="flex items-center gap-1">
            <Bookmark /> {bookmarks}
          </span>
        </button>
      </div>

      <IdModal
        isOpen={idModal}
        onClose={() => {
          setIdModal(false);
          setPendingAction(null);
        }}
        onSubmit={handleIdSubmit}
      />
    </>
  );
}