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
import Link from 'next/link';
import { useEffect, useState, use } from 'react'; // ✅ Added 'use'
import ReactMarkdown from 'react-markdown';

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

interface Evidence {
  url: string;
  source: string;
  summary: string;
  verification_status: string;
  supporting_documents: Array<{
    url: string;
    title: string;
  }>;
}

interface EvidenceResponse {
  evidence: Evidence;
  fact_check_status?: string;
  has_evidence?: boolean;
}

// ✅ FIXED: Params is a Promise in Next.js 15+
export default function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ✅ Unwrap params
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ Hydration safety

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  // ✅ FIXED: Fetch article FIRST
  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(
          'https://daily-news-5k66.onrender.com/news/written/get/'
        );
        
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        
        const articles: Article[] = await response.json();
        const articleId = parseInt(slug, 10);

        console.log('🔍 WEB7 DEBUG - Article Fetch:');
        console.log('Slug:', slug);
        console.log('Parsed ID:', articleId);
        console.log('Available articles:', articles.map(a => ({ id: a.id, title: a.title })));

        if (isNaN(articleId)) {
          console.log('❌ Invalid article ID');
          setArticle(null);
          setLoading(false);
          return;
        }

        // ✅ CRITICAL FIX: Only use .find(), NO array index fallback
        const foundArticle = articles.find((a) => a.id === articleId);

        if (foundArticle) {
          console.log('✅ Article found:', foundArticle.title, 'ID:', foundArticle.id);
        } else {
          console.log('❌ No article with ID:', articleId);
        }

        setArticle(foundArticle || null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  // ✅ FIXED: Fetch evidence AFTER article loads, using article.id
  useEffect(() => {
    if (!article || loading) return;

    const fetchEvidence = async () => {
      try {
        setEvidenceLoading(true);

        console.log('🔍 WEB7 DEBUG - Evidence Fetch:');
        console.log('Fetching evidence for article ID:', article.id);

        // ✅ FIXED: Use new endpoint with article.id
        const response = await fetch(
          `https://daily-news-5k66.onrender.com/process/news/${article.id}/evidence/`
        );

        console.log('Evidence response status:', response.status);

        if (response.status === 404) {
          console.log('ℹ️ No evidence available (404)');
          setEvidence(null);
          setEvidenceLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch evidence: ${response.status}`);
        }

        const data: EvidenceResponse = await response.json();
        console.log('Evidence data:', data);

        if (data.evidence && Object.keys(data.evidence).length > 0) {
          setEvidence(data.evidence);
          setIsModalOpen(true);
          console.log('✅ Evidence loaded, opening modal');
        } else {
          console.log('⚠️ Empty evidence object');
          setEvidence(null);
        }
      } catch (error) {
        console.error('Error fetching evidence:', error);
        setEvidence(null);
      } finally {
        setEvidenceLoading(false);
      }
    };

    fetchEvidence();
  }, [article, loading]);

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

  // ✅ FIXED: Proper JSX return instead of notFound()
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
            <Link href="/web7/allnews" className="text-primary hover:underline">
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

      {/* ✅ FIXED: Only render modal if evidence exists */}
      {mounted && evidence && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Article Evidence</h2>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Source: {evidence.source}</p>
              <a
                href={evidence.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Original Source
              </a>
            </div>

            <div>
              <p className="font-semibold mb-2">Summary:</p>
              <p className="text-muted-foreground">{evidence.summary}</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Verification Status:</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  evidence.verification_status === 'True'
                    ? 'bg-green-100 text-green-800'
                    : evidence.verification_status === 'Partially True'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {evidence.verification_status}
              </span>
            </div>

            {evidence.supporting_documents && evidence.supporting_documents.length > 0 && (
              <div>
                <p className="font-semibold mb-2">Supporting Documents:</p>
                <ul className="space-y-2">
                  {evidence.supporting_documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {doc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-6">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      )}

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          <article className="space-y-6">
            <div className="flex items-center gap-4 pt-6">
              <Link href="/web7/allnews" className="text-primary hover:underline">
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
              {/* <div className="flex items-center gap-2 text-sm">
                <span>By Daily News AI</span>
              </div> */}
            </div>

            {/* ✅ Evidence status indicator */}
            {mounted && !evidenceLoading && (
              <div className={`p-4 rounded-lg border ${
                evidence 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {evidence ? '✓ Fact-Checked' : 'ℹ️ Not Yet Verified'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {evidence 
                        ? 'This article has been fact-checked with evidence.' 
                        : 'This article has not been independently verified yet.'}
                    </p>
                  </div>
                  {evidence && (
                    <Button 
                      onClick={() => setIsModalOpen(true)}
                      variant="outline"
                      size="sm"
                    >
                      View Evidence
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="prose prose-gray max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* ✅ Hydration-safe engagement buttons */}
            {mounted && (
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
              <Link href="/web7/allnews" className="text-primary hover:underline">
                &larr; Back to News
              </Link>
            </div>
          </article>

          <div className="space-y-8">
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