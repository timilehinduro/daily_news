'use client';

import { useEffect, useState, use } from 'react'; // ✅ ADDED 'use' hook
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
// import { notFound } from 'next/navigation'; // ❌ REMOVED - causes hydration issues
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import VideoPlayer from '@/components/ui/videoplayer';
import EngagementButtons from '@/components/ui/engagement-buttons';
import Image from 'next/image';
import CommentsModal from '@/components/ui/comments-modal';
import IdModal from '@/components/ui/id-modal';
import Modal from '@/components/ui/modal';
import welcomeModalContent from '@/lib/modal-content';

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

// ❌ OLD - params is undefined in Next.js 15+
// export default function VideoArticlePage({
//   params,
// }: {
//   params: { slug: string };
// }) {

// ✅ NEW - params is a Promise that needs unwrapping
export default function VideoArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Unwrap the params Promise
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [article, setArticle] = useState<VideoArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false); // ✅ ADDED - was missing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(''); // ✅ ADDED - was missing
  const [mounted, setMounted] = useState(false); // ✅ ADDED - for hydration safety

  useEffect(() => {
    setMounted(true);
    setIsModalOpen(true);
  }, []);

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
          'https://daily-news-5k66.onrender.com/news/video/get/'
        );
        const articles: VideoArticle[] = await response.json();
        
        console.log('🔍 VIDEO DEBUG:');
        console.log('slug:', slug);
        
        // ✅ Changed from params.slug to slug
        const articleId = parseInt(slug, 10);
        console.log('Parsed articleId:', articleId);
        console.log('Is NaN?:', isNaN(articleId));
        
        // ✅ ADDED - validate articleId
        if (isNaN(articleId)) {
          console.log('❌ ArticleId is NaN');
          setArticle(null);
          setLoading(false);
          return;
        }
        
        const foundArticle = articles.find(
          (article) => article.id === articleId
        );
        
        if (foundArticle) {
          console.log('✅ Video article found:', foundArticle.title);
        } else {
          console.log('❌ No video article with ID:', articleId);
        }
        
        setArticle(foundArticle || null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]); // ✅ Changed dependency from params.slug to slug

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
          <p>Loading video...</p>
        </main>
        <GenFooter />
      </div>
    );
  }

  // ❌ OLD CODE - causes 404 and hydration issues:
  // if (!article) {
  //   notFound();
  // }

  // ✅ NEW CODE - proper JSX return instead of notFound():
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The video you're looking for doesn't exist.
            </p>
            <Link href="/web6/allnews" className="text-primary hover:underline">
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

      {/* ✅ ADDED mounted check - prevents hydration issues */}
      {mounted && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {welcomeModalContent.brief}
            </h2>
            <Image
              src={welcomeModalContent.image}
              alt="Daily News"
              width={200}
              height={80}
              className="mx-auto mb-4"
            />
          </div>
          <p className="mb-4">{welcomeModalContent.text}</p>
          <Button onClick={() => setIsModalOpen(false)}>I understand</Button>
        </Modal>
      )}

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

            {/* ✅ FIXED - removed extra wrapper div */}
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: article.summary }} 
            />

            {/* ✅ ADDED mounted check - prevents hydration issues */}
            {mounted && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
                <EngagementButtons
                  newsId={article.id}
                  initialLikes={article.likes.length}
                  initialShares={article.shares.length}
                  content_type="video"
                  url="https://daily-news-5k66.onrender.com/news/video"
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

            {showComments && (
              <CommentsModal
                url={`https://daily-news-5k66.onrender.com/news/video/${article.id}/comment/`}
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
                href="/web6/allnews"
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