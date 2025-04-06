import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface NewsItem {
  id: number;
  published_content: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  image_url: string;
  likes: Array<{ id: number; created_at: string }>;
  comments: Array<{ id: number; text: string; created_at: string }>;
  shares: Array<{ id: number; platform: string; created_at: string }>;
}

export default async function NewsPage() {
  // Fetch news data
  const response = await fetch(
    'https://daily-news-5k66.onrender.com/news/written-image/get/',
    {
      cache: 'no-store', // Disable caching to always get fresh data
    }
  );
  const newsData: NewsItem[] = await response.json();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {newsData.map((item) => (
              <article key={item.id} className="border-b pb-8">
                <div className="md:flex gap-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <Image
                      src={item.image_url || '/placeholder.svg'}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover h-full w-full aspect-video"
                    />
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
                        href={`/web2/allnews/${item.id}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <div className="prose max-w-3xl mx-auto">
                      <ReactMarkdown>
                        {item.content.slice(0, 200)}
                      </ReactMarkdown>
                    </div>
                    <Link
                      href={`/web2/allnews/${item.id}`}
                      className="text-primary hover:underline"
                    >
                      <span className="flex items-center gap-1">
                        Read more <ArrowRight />
                      </span>
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
