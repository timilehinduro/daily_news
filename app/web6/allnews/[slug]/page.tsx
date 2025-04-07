'use client';

import { useEffect, useState } from 'react';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import VideoPlayer from '@/components/ui/videoplayer';
import EngagementButtons from '@/components/ui/engagement-buttons';
import Image from 'next/image';
import CommentsModal from '@/components/ui/comments-modal';
import Modal from '@/components/ui/modal';

interface VideoArticle {
  id: number;
  published_content: number;
  title: string;
  video_url: string;
  summary: string;
  created_at: string;
  category: string;
  likes: Array<{ id: number; created_at: string }>;
  comments: Array<{
    id: number;
    video_content: number;
    text: string;
    created_at: string;
  }>;
  shares: Array<{
    id: number;
    video_content: number;
    platform: string;
    created_at: string;
  }>;
}

export default function VideoArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const [article, setArticle] = useState<VideoArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          'https://daily-news-5k66.onrender.com/news/video/get/'
        );
        const articles: VideoArticle[] = await response.json();
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="mb-4">
          Daily News is an AI-driven online news website built to keep you
          informed about local, national, and global events and affairs around
          you. We employ an artificial intelligence (AI) system that is
          custom-designed and trained for news curation and production. As with
          many AI systems, our news platform strives for perfection and
          accuracy, but it is not error-free. Our AI-powered news platform
          enables full transparency of our news production processes while
          adhering to strict protocols. Daily News aims to redefine modern
          journalism through cutting-edge artificial intelligence by minimizing
          errors and promoting open news reporting.
        </p>
        <Button onClick={() => setIsModalOpen(false)}>I understand</Button>
      </Modal>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 pb-6">
          <Link href="/web6/allnews" className="text-primary hover:underline">
            &larr; Back to News
          </Link>
        </div>
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
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

            <VideoPlayer src={article.video_url} />

            <div className="prose prose-gray max-w-none">
              <p className="mb-4">{article.summary}</p>
            </div>

            {/* Engagement Section */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
              <EngagementButtons
                newsId={article.id}
                initialLikes={article.likes.length}
                initialShares={article.shares.length}
                content_type="video"
                url="https://daily-news-5k66.onrender.com/news/video"
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
            <div className="flex items-center gap-4 pt-6">
              <Link
                href="/web6/allnews"
                className="text-primary hover:underline"
              >
                &larr; Back to News
              </Link>
            </div>
          </article>

          {showComments && (
            <CommentsModal
              url={`https://daily-news-5k66.onrender.com/news/video/${article.id}/comment/`}
              newsId={article.id}
              initialComments={article.comments}
              onClose={() => setShowComments(false)}
            />
          )}

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
