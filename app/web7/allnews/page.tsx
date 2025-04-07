'use client';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
// import InfoSec from '@/components/ui/info';
import Link from 'next/link';
import React from 'react';
import Modal from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ArticleCard from '@/components/ui/article-card';

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

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        'https://daily-news-5k66.onrender.com/news/written/get/',
        {
          cache: 'no-store', // Disable caching to always get fresh data
        }
      );
      const data = await response.json();
      setNewsData(data);
    };

    fetchNews();
  }, []);

  // useEffect(() => {
  //   setIsModalOpen(true);
  // }, []);

  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {newsData.map((news) => (
              <ArticleCard key={news.id} news={news} url={'/web7'} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Advertisement Section */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Advertisement</h3>
              <div className="bg-muted aspect-square flex items-center justify-center">
                {/* <span className="text-muted-foreground">Ad Space</span> */}
                <Image
                  src="/icecream.jpg"
                  alt="Ad Space"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            </section>

            {/* More Stories Section */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">More Stories</h3>
              <div className="space-y-4">
                <Link href="#" className="block hover:text-primary">
                  Healthcare Reform Bill Passes Senate Vote
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Space Mission Successfully Launches New Satellite
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Sports: Championship Finals Set for Weekend
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Education: New Learning Methods Show Promise
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Entertainment: Award Show Highlights
                </Link>
              </div>
            </section>

            {/* Additional Details */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary"
                >
                  Subscribe to Newsletter
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary"
                >
                  Download Our App
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary"
                >
                  Weather Updates
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary"
                >
                  Event Calendar
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <GenFooter />
    </div>
  );
}
