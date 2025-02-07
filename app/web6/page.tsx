import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import InfoSec from '@/components/ui/info';

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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Video News</h1>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {videoNewsItems.map((item) => (
              <article key={item.id} className="border-b pb-8">
                <div className="md:flex gap-6">
                  <div className="md:w-1/2 mb-4 md:mb-0 relative">
                    <Image
                      src={item.thumbnail || '/placeholder.svg'}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="rounded-lg object-cover w-full aspect-video"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-black/50 hover:bg-black/70"
                      >
                        <Play className="h-6 w-6 text-white" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white">
                      {item.duration}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{item.category}</span>
                      <span>•</span>
                      <time dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString()}
                      </time>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        href={`/web6/${item.slug}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">{item.preview}</p>
                    <Link
                      href={`/web6/${item.slug}`}
                      className="text-primary hover:underline"
                    >
                      Watch now
                    </Link>
                    <InfoSec />
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
            {/* Featured Video */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Featured Video</h3>
              <div className="relative">
                <Image
                  src="/placeholder.svg"
                  alt="Featured Video"
                  width={300}
                  height={169}
                  className="rounded-lg object-cover w-full aspect-video"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-black/50 hover:bg-black/70"
                  >
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white">
                  7:15
                </div>
              </div>
              <h4 className="font-semibold mt-2 hover:text-primary">
                <Link href="#">Exclusive: Inside the New Space Station</Link>
              </h4>
            </section>

            {/* Popular Videos */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Popular Videos</h3>
              <div className="space-y-4">
                {videoNewsItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-24">
                      <Image
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        width={96}
                        height={54}
                        className="rounded object-cover aspect-video"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[10px] text-white">
                        {item.duration}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold hover:text-primary line-clamp-2">
                        <Link href={`/video-news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Video Categories</h3>
              <div className="space-y-2">
                {[
                  'Politics',
                  'Technology',
                  'Economy',
                  'Science',
                  'Culture',
                ].map((category) => (
                  <Link
                    key={category}
                    href={`/video-news/category/${category.toLowerCase()}`}
                    className="block text-muted-foreground hover:text-primary"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>Daily News - Your Source for Latest Video Updates</p>
          <p>
            &copy; {new Date().getFullYear()} Daily News. All rights reserved.
          </p>
        </div>
      </div>

      <GenFooter />
    </div>
  );
}
