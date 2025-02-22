import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// This would typically come from an API or database
const newsItems = [
  {
    id: 1,
    title: 'Major Political Development Shapes Global Policy',
    slug: 'major-political-development',
    image:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    preview:
      'Breaking news coverage of significant political events and their impact on international relations. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Politics',
    date: '2025-02-05',
  },
  {
    id: 2,
    title: 'Economic Reforms Signal Market Changes',
    slug: 'economic-reforms',
    image:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    preview:
      'Analysis of recent economic policy changes and their potential impact on global markets. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    category: 'Economy',
    date: '2025-02-04',
  },
  {
    id: 3,
    title: 'Technology Innovation Breakthrough',
    slug: 'technology-innovation',
    image:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    preview:
      'Latest developments in technology sector showing promising results for future applications. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    category: 'Technology',
    date: '2025-02-03',
  },
  {
    id: 4,
    title: 'Environmental Initiative Launches',
    slug: 'environmental-initiative',
    image:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    preview:
      'New global initiative aims to address climate change through collaborative effort. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    category: 'Environment',
    date: '2025-02-02',
  },
  {
    id: 5,
    title: 'Cultural Event Draws Global Attention',
    slug: 'cultural-event',
    image:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    preview:
      'International cultural festival celebrates diversity and promotes global understanding. Deserunt mollit anim id est laborum consectetur adipiscing elit.',
    category: 'Culture',
    date: '2025-02-01',
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {newsItems.map((item) => (
              <article key={item.id} className="border-b pb-8">
                <div className="md:flex gap-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover w-full aspect-video"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{item.category}</span>
                      <span>•</span>
                      <time dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString()}
                      </time>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        href={`/web2/${item.slug}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">{item.preview}</p>
                    <Link
                      href={`/web2/${item.slug}`}
                      className="text-primary hover:underline"
                    >
                      Read more
                    </Link>
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
