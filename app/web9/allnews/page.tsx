'use client';

import { useEffect, useState } from 'react';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/ui/videoplayer';
import EngagementButtons from '@/components/ui/engagement-buttons';
import Image from 'next/image';
import Modal from '@/components/ui/modal';

interface VideoNews {
  id: number;
  title: string;
  video_url: string;
  summary: string;
  created_at: string;
  category: string;
  likes: Array<{ id: number; created_at: string }>;
  comments: Array<{ id: number; text: string; created_at: string }>;
  shares: Array<{ id: number; platform: string; created_at: string }>;
}

export default function VideoNewsPage() {
  const [videoNews, setVideoNews] = useState<VideoNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoNews = async () => {
      try {
        const response = await fetch(
          'https://daily-news-5k66.onrender.com/news/video/get/'
        );
        const data = await response.json();
        setVideoNews(data);
      } catch (error) {
        console.error('Error fetching video news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoNews();
  }, []);

  // Helper function to strip HTML tags from summary
  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p>Loading videos...</p>
        </main>
        <GenFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest Video News</h1>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {videoNews.map((item) => (
              <article key={item.id} className="border-b pb-8">
                <div className="md:flex gap-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <VideoPlayer src={item.video_url} />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{item.category || 'General'}</span>
                      <span>•</span>
                      <time dateTime={item.created_at}>
                        {new Date(item.created_at).toLocaleDateString()}
                      </time>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        href={`/web9/allnews/${item.id}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {stripHtmlTags(item.summary).substring(0, 200)}
                      {stripHtmlTags(item.summary).length > 200 ? '...' : ''}
                    </p>
                    <Link
                      className="text-primary hover:underline inline-flex items-center gap-1"
                      href={`/web9/allnews/${item.id}`}
                    >
                      Watch Now →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

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