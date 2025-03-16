'use client';
import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import VideoPlayer from '@/components/ui/videoplayer';
import Modal from '@/components/ui/modal';
import { useEffect, useState } from 'react';

// This would typically come from an API or database
const videoNewsItems = [
  {
    id: 1,
    title: 'Breaking: Major Political Summit Concludes',
    slug: 'tech-giant-unveils-ai',
    thumbnail: '/placeholder.svg',
    duration: '5:23',
    preview:
      'World leaders reach a landmark agreement on climate change policies. Our correspondent reports from the summit.',
    category: 'Politics',
    date: '2025-02-05',
  },
  {
    id: 2,
    title: 'Tech Giant Unveils Revolutionary AI',
    slug: 'tech-giant-unveils-ai',
    thumbnail: '/placeholder.svg',
    duration: '3:45',
    preview:
      "Silicon Valley's latest AI breakthrough promises to transform industries. We take a closer look at its potential impact.",
    category: 'Technology',
    date: '2025-02-04',
  },
  {
    id: 3,
    title: 'Global Markets React to Economic Shifts',
    slug: 'tech-giant-unveils-ai',
    thumbnail: '/placeholder.svg',
    duration: '4:10',
    preview:
      'Stock markets worldwide show volatility as new economic policies take effect. Our financial analyst explains the trends.',
    category: 'Economy',
    date: '2025-02-03',
  },
  {
    id: 4,
    title: 'Breakthrough in Renewable Energy Storage',
    slug: 'tech-giant-unveils-ai',
    thumbnail: '/placeholder.svg',
    duration: '6:02',
    preview:
      'Scientists announce a game-changing discovery in energy storage technology. We explore its potential for sustainable power.',
    category: 'Science',
    date: '2025-02-02',
  },
  {
    id: 5,
    title: 'Cultural Festival Celebrates Diversity',
    slug: 'tech-giant-unveils-ai',
    thumbnail: '/placeholder.svg',
    duration: '3:30',
    preview:
      'A vibrant international festival showcases global cultures. Our team brings you the highlights and interviews with participants.',
    category: 'Culture',
    date: '2025-02-01',
  },
];

export default function VideoNewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="mb-4">
          Please be aware that the news articles presented on this page are
          generated using artificial intelligence. While we strive for accuracy,
          these articles should not be considered as traditional journalistic
          content.
        </p>
        <p className="mb-4">
          We encourage readers to verify information from multiple sources and
          to approach the content with a critical mindset.
        </p>
        <Button onClick={() => setIsModalOpen(false)}>I understand</Button>
      </Modal>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Video News</h1>

        <div className="grid md:grid-cols-[4fr,1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {videoNewsItems.map((item) => (
              <article key={item.id} className="border-b pb-8">
                <div className="md:flex gap-6">
                  <div className="md:w-2/3 mb-4 md:mb-0 relative">
                    <VideoPlayer src="https://www.youtube.com/watch?v=W5MR6Jy3SLU" />
                  </div>
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{item.category}</span>
                      <span>•</span>
                      <time dateTime={item.date}>{item.date}</time>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        href={`/web6/${item.slug}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {item.preview.split(' ').slice(0, 30).join(' ')}
                      {item.preview.split(' ').length > 30 ? '...' : ''}
                    </p>
                    {/* <Link
                      href={`/web6/${item.slug}`}
                      className="text-primary hover:underline"
                    >
                      Watch now
                    </Link> */}
                  </div>
                </div>
              </article>
            ))}

            <div className="text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Advertisement Section */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Advertisement</h3>
              <div className="bg-muted aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Ad Space</span>
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
