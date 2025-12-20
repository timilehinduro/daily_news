'use client';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Heart, MessageCircle, Share2 } from 'lucide-react';

// Define interface for the news data
interface NewsItem {
  id: number;
  title: string;
  content: string;
  created_at: string;
  category: string;
  likes: Array<{ id: number; created_at: string }>;
  comments: Array<{ id: number; text: string; created_at: string }>;
  shares: Array<{ id: number; platform: string; created_at: string }>;
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, try to fetch the specific article
        const response = await fetch(
          `https://daily-news-5k66.onrender.com/news/written/get/${params.id}`,
          { cache: 'no-store' }
        );

        if (!response.ok) {
          // If specific endpoint doesn't exist, fetch all and filter
          const allNewsResponse = await fetch(
            'https://daily-news-5k66.onrender.com/news/written/get/',
            { cache: 'no-store' }
          );
          
          if (!allNewsResponse.ok) {
            throw new Error('Failed to fetch article');
          }
          
          const allNews: NewsItem[] = await allNewsResponse.json();
          const foundArticle = allNews.find(
            (item) => item.id === parseInt(params.id as string)
          );
          
          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            setError('Article not found');
          }
        } else {
          const data = await response.json();
          setArticle(data);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <GenFooter />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              {error || 'Article not found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/web7')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </div>
        </main>
        <GenFooter />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/web7')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-sm p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {new Date(article.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{article.likes.length} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">
                  {article.comments.length} comments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="text-sm">{article.shares.length} shares</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {article.content}
              </p>
            </div>

            {/* Engagement Actions */}
            <div className="flex gap-4 mt-8 pt-8 border-t">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </article>

          {/* Comments Section */}
          {article.comments.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">
                Comments ({article.comments.length})
              </h2>
              <div className="space-y-4">
                {article.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <p className="text-gray-700 mb-2">{comment.text}</p>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <GenFooter />
    </div>
  );
}