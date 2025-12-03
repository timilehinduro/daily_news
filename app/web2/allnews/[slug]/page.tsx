'use client';

import { useEffect, useState } from 'react';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import EngagementButtons from '@/components/ui/engagement-buttons';
import ReactMarkdown from 'react-markdown';
import { MessageCircle } from 'lucide-react';
import CommentsModal from '@/components/ui/comments-modal';
import IdModal from '@/components/ui/id-modal';

interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  category: string;
  likes: Array<{ id: number; created_at: string }>;
  comments: Array<{ id: number; text: string; created_at: string }>;
  shares: Array<{ id: number; platform: string; created_at: string }>;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          'https://daily-news-5k66.onrender.com/news/written-image/get/'
        );
        const articles: Article[] = await response.json();
        const articleId = parseInt(params.slug);
        const foundArticle = articles.find(
          (article) => article.id === articleId
        );
        setArticle(foundArticle || null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    notFound();
  }

  const handleCommentsClick = () => {
    if (!userId) {
      setShowIdModal(true);
    } else {
      setShowComments(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
            <Link href="/web2/allnews" className="text-primary hover:underline">
              &larr; Back to News
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{article.category || 'General'}</span>
                <span>•</span>
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleDateString()}
                </time>
              </div>
              <h1 className="text-4xl font-bold">{article.title}</h1>
            </div>

            {article.image_url && (
              <Image
                src={article.image_url}
                alt={article.title}
                width={800}
                height={450}
                className="rounded-lg object-cover w-full aspect-video"
              />
            )}

            <div className="prose max-w-3xl mx-auto">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Engagement Section */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
              <EngagementButtons
                url={`https://daily-news-5k66.onrender.com/news/written-image`}
                newsId={article.id}
                initialLikes={article.likes.length}
                initialShares={article.shares.length}
                content_type="written-image"
              />
              <button
                onClick={() => setShowComments(true)}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-1">
                  <MessageCircle /> {article.comments.length}
                </span>
              </button>
            </div>

            {showComments && (
              <CommentsModal
                url={`https://daily-news-5k66.onrender.com/news/written-image/${article.id}/comment/`}
                newsId={article.id}
                initialComments={article.comments}
                onClose={() => setShowComments(false)}
              />
            )}

            <div className="flex items-center gap-4 pt-6">
              <Link
                href="/web2/allnews"
                className="text-primary hover:underline"
              >
                &larr; Back to News
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Advertisement Section */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Advertisement</h3>
              <div className="bg-muted aspect-square flex items-center justify-center">
                <Image
                  src="/icecream.jpg"
                  alt="Ad Space"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            </section>

            {/* Related Stories */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Related Stories</h3>
              <div className="space-y-4">
                <Link href="#" className="block hover:text-primary">
                  Global Summit Addresses Policy Changes
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Economic Impact of New Policies
                </Link>
                <Link href="#" className="block hover:text-primary">
                  International Response to Development
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Analysis: Long-term Implications
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Expert Commentary on Global Changes
                </Link>
              </div>
            </section>

            {/* Share Article */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Share This Article</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-muted-foreground hover:text-primary">
                  Share on Twitter
                </button>
                <button className="w-full text-left text-sm text-muted-foreground hover:text-primary">
                  Share on Facebook
                </button>
                <button className="w-full text-left text-sm text-muted-foreground hover:text-primary">
                  Share on LinkedIn
                </button>
                <button className="w-full text-left text-sm text-muted-foreground hover:text-primary">
                  Copy Link
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <GenFooter />
    </div>
  );
}
