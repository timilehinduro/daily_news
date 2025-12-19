'use client';

import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import EngagementButtons from '@/components/ui/engagement-buttons';
import CommentsModal from '@/components/ui/comments-modal';
import Image from 'next/image';
import toast from 'react-hot-toast';
import IdModal from '@/components/ui/id-modal';
import ReactMarkdown from 'react-markdown';
import { MessageCircle } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

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

// ✅ FIXED: params is a Promise in Next.js 15+
export default function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ✅ Unwrap the params Promise
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          'https://daily-news-5k66.onrender.com/news/written/get/'
        );
        
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        
        const articles: Article[] = await res.json();

        console.log('🔍 TEXT-NEWS DEBUG:');
        console.log('slug from URL:', slug);
        console.log('slug type:', typeof slug);
        console.log('All articles:', articles.map(a => ({ id: a.id, title: a.title })));
        
        const articleId = Number.parseInt(slug, 10);
        console.log('Parsed articleId:', articleId);
        console.log('Is NaN?:', isNaN(articleId));

        // ✅ CRITICAL FIX: Only find by ID, NO array index fallback
        if (isNaN(articleId)) {
          console.log('❌ Invalid article ID');
          setArticle(null);
          setLoading(false);
          return;
        }

        // ✅ ONLY use .find() by ID - removed the fallback that caused wrong articles
        const found = articles.find((a) => a.id === articleId);

        if (found) {
          console.log('✅ Article found:', found.title, 'ID:', found.id);
        } else {
          console.log('❌ No article with ID:', articleId);
          console.log('Available article IDs:', articles.map(a => a.id));
        }

        setArticle(found || null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]); // ✅ Dependency on slug to refetch when URL changes

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
    setShowComments(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-lg">Loading article...</p>
          </div>
        </main>
        <GenFooter />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Link href="/text-news/allnews" className="text-primary hover:underline">
              ← Back to News
            </Link>
          </div>
        </main>
        <GenFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
            <div className="flex items-center gap-4 pt-6">
              <Link href="/text-news/allnews" className="text-primary hover:underline">
                &larr; Back to News
              </Link>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{article?.title}</h1>
              {/* <div className="flex items-center gap-2 text-sm">
                <span>By Daily News AI</span>
              </div> */}
            </div>

            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article?.content || ''),
              }}
            />

            {mounted && article && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
                <EngagementButtons
                  url={`https://daily-news-5k66.onrender.com/news/written`}
                  newsId={article.id}
                  initialLikes={article.likes.length}
                  initialShares={article.shares.length}
                />
                <button
                  onClick={handleCommentsClick}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <MessageCircle /> {article.comments.length}
                  </span>
                </button>
              </div>
            )}

            {showComments && article && (
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
              <Link href="/text-news/allnews" className="text-primary hover:underline">
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