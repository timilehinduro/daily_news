'use client';
import { Button } from '@/components/ui/button';
import CommentsModal from '@/components/ui/comments-modal';
import EngagementButtons from '@/components/ui/engagement-buttons';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import IdModal from '@/components/ui/id-modal';
import Modal from '@/components/ui/modal';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
// import InfoSec from '@/components/ui/info';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Update the interface to include engagement fields
interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  category: string;
  slug: string;
  comments: Array<{ id: number; text: string; created_at: string }>;
  likes: Array<{ id: number; created_at: string }>;
  shares: Array<{ id: number; platform: string; created_at: string }>;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(
          'https://daily-news-5k66.onrender.com/news/written/get/'
        );
        const articles: Article[] = await response.json();
        const articleId = parseInt(params.slug);
        const foundArticle = articles[articleId - 1];
        setArticle(foundArticle || null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [params.slug]);

  const handleCommentsClick = () => {
    if (!userId) {
      setShowIdModal(true);
    } else {
      setShowComments(true);
    }
  };

  const handleIdSubmit = (newId: string) => {
    localStorage.setItem('myId', newId);
    setUserId(newId);
    setShowIdModal(false);
    setShowComments(true); // Show comments modal after ID is submitted
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
            <div className="flex items-center gap-4 pt-6">
              <Link
                href="/web7/allnews"
                className="text-primary hover:underline"
              >
                &larr; Back to News
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{article.category}</span>
                <span>•</span>
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleDateString()}
                </time>
              </div>
              <h1 className="text-4xl font-bold">{article.title}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span>By Daily News AI</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <div key={index} className="prose max-w-3xl">
                  <ReactMarkdown>{paragraph}</ReactMarkdown>
                </div>
              ))}
            </div>

            {/* Add engagement section */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
              <EngagementButtons
                url={`https://daily-news-5k66.onrender.com/news/written`}
                newsId={article.id}
                initialLikes={article.likes.length}
                initialShares={article.shares.length}
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
                url={`https://daily-news-5k66.onrender.com/news/written/${article.id}/comment/`}
                newsId={article.id}
                initialComments={article.comments}
                onClose={() => setShowComments(false)}
              />
            )}

            {showIdModal && (
              <IdModal
                isOpen={showIdModal}
                onClose={() => setShowIdModal(false)}
                onSubmit={handleIdSubmit}
              />
            )}

            <div className="flex items-center gap-4 pt-6">
              <Link
                href="/web7/allnews"
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
                {/* <span className="text-muted-foreground">Ad Space</span> */}
                <Image
                  src="/book.jpg"
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
