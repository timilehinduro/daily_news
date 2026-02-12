'use client';

import { useEffect, useState, use } from 'react';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import VideoPlayer from '@/components/ui/videoplayer';
import EngagementButtons from '@/components/ui/engagement-buttons';
import Image from 'next/image';
import CommentsModal from '@/components/ui/comments-modal';
import IdModal from '@/components/ui/id-modal';
import Modal from '@/components/ui/modal';

interface VideoArticle {
  id: number;
  published_content: number;
  generated_content_id?: number;
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

interface Evidence {
  url: string;
  source: string;
  summary: string;
  details: Array<{ 
    clarity: string; 
    accuracy: string;
    disclosure: string;
    source_identification: string; 
  }>;
  verification_status: string;
  correctness_score: number;
  "what's_accurate": string;
  "what's_not": string;
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

export default function VideoArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [article, setArticle] = useState<VideoArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
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
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          'https://daily-news-5k66.onrender.com/news/video/get/'
        );
        
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        
        const articles: VideoArticle[] = await response.json();
        const articleId = parseInt(slug, 10);

        console.log('🔍 WEB9 DEBUG - Article Fetch:');
        console.log('Slug:', slug);
        console.log('Parsed ID:', articleId);

        if (isNaN(articleId)) {
          setArticle(null);
          setLoading(false);
          return;
        }

        const foundArticle = articles.find((article) => article.id === articleId);

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
  }, [slug]);

  useEffect(() => {
    if (!article || loading) return;

    const fetchEvidence = async () => {
      try {
        setEvidenceLoading(true);

        const evidenceId = article.generated_content_id || article.published_content;
        
        if (!evidenceId) {
          setEvidence(null);
          setEvidenceLoading(false);
          return;
        }

        const response = await fetch(
          `https://daily-news-5k66.onrender.com/content-processing/news/${evidenceId}/evidence/`
        );

        if (response.status === 404) {
          setEvidence(null);
          setEvidenceLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`);
        }

        const data: EvidenceResponse = await response.json();

        if (data.evidence && Object.keys(data.evidence).length > 0) {
          setEvidence(data.evidence);
          setIsModalOpen(true);
        } else {
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
            <p className="text-lg">Loading video...</p>
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
            <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The video you're looking for doesn't exist.
            </p>
            <Link href="/web9/allnews" className="text-primary hover:underline">
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

          {/* Display Details */}
          {evidence.details && evidence.details.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Analysis Details:</p>
              <div className="space-y-3 bg-muted p-4 rounded-lg">
                {evidence.details.map((detail, index) => (
                  <div key={index} className="space-y-2">
                    <div>
                      <p className="font-medium text-sm">Clarity:</p>
                      <p className="text-sm text-muted-foreground">{detail.clarity}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Accuracy:</p>
                      <p className="text-sm text-muted-foreground">{detail.accuracy}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Disclosure:</p>
                      <p className="text-sm text-muted-foreground">{detail.disclosure}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Source Identification:</p>
                      <p className="text-sm text-muted-foreground">{detail.source_identification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Accurate */}
          {evidence["what's_accurate"] && (
            <div>
              <p className="font-semibold mb-2">What's Accurate:</p>
              <p className="text-muted-foreground">{evidence["what's_accurate"]}</p>
            </div>
          )}

          {/* What's Not */}
          {evidence["what's_not"] && (
            <div>
              <p className="font-semibold mb-2">What's Not:</p>
              <p className="text-muted-foreground">{evidence["what's_not"]}</p>
            </div>
          )}

          <div>
            <p className="font-semibold mb-2">Verification Status:</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${
                evidence.verification_status === "True"
                  ? "bg-green-100 text-green-800"
                  : evidence.verification_status === "Partially True"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {evidence.verification_status}
            </span>
          </div>

          {/* ✅ NEW: Correctness Score (after Verification Status) */}
          <div>
            <p className="font-semibold mb-2">Correctness Score:</p>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold leading-none">
                  {evidence.correctness_score ?? 0}
                </span>
                <span className="text-sm text-muted-foreground">/ 10</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(((evidence.correctness_score ?? 0) / 10) * 100)}%
              </div>
            </div>

            <div className="mt-3">
              {/* Progress bar container */}
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  role="progressbar"
                  aria-valuenow={evidence.correctness_score ?? 0}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  className={`h-full transition-all duration-500 ${
                    (evidence.correctness_score ?? 0) >= 7
                      ? "bg-green-500"
                      : (evidence.correctness_score ?? 0) >= 4
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.max(0, Math.min(10, evidence.correctness_score ?? 0)) * 10}%`,
                  }}
                />
              </div>

              {/* Legend (optional) */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />
                  <span>7–10 (High)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" />
                  <span>4–6 (Medium)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />
                  <span>0–3 (Low)</span>
                </div>
              </div>
            </div>
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
        <div className="flex items-center gap-4 pb-6">
          <Link href="/web9/allnews" className="text-primary hover:underline">
            &larr; Back to News
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr,300px] gap-8">
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

            {mounted && !evidenceLoading && (
              <div className={`p-4 rounded-lg border ${
                evidence ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {evidence ? '✓ Fact-Checked' : 'ℹ️ Not Yet Verified'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {evidence 
                        ? 'This video has been fact-checked.' 
                        : 'This video has not been verified yet.'}
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

            <VideoPlayer src={article.video_url} />

            <div className="prose prose-gray max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.summary }} />
            </div>

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
              <Link href="/web9/allnews" className="text-primary hover:underline">
                &larr; Back to News
              </Link>
            </div>
          </article>

          <div className="space-y-8">
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