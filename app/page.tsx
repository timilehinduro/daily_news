import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Menu, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/ui/header';
import GenFooter from '@/components/ui/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Featured Story */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%206.13.51%E2%80%AFAM-oRzsAGJVsWvcN0ZWgEVvnh4jOwIhhZ.png"
              alt="Featured news"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full aspect-video"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">U.S.</Badge>
                <span className="text-sm text-muted-foreground">
                  3 hours ago
                </span>
              </div>
              <h1 className="text-2xl font-bold hover:text-primary">
                <Link href="#">
                  DC plane crash: Similar tragedy happened 43 years ago
                </Link>
              </h1>
              <p className="text-muted-foreground">
                Breaking news coverage of significant events unfolding in the
                nation's capital...
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Image
                  src="/placeholder.svg"
                  alt="News thumbnail"
                  width={200}
                  height={120}
                  className="rounded object-cover aspect-video w-[200px]"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Politics</Badge>
                  </div>
                  <h3 className="font-semibold hover:text-primary line-clamp-2">
                    <Link href="#">Related Breaking News Story {i}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Quick summary of the breaking news story and its
                    significance...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Content Section */}
        <section className="mb-12">
          <h2 className="text-sm text-muted-foreground mb-6">Adverticement</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              'Online Jobs in USA From Nigeria (Salaries Will Surprise You)',
              'USA Companies Hiring Remote Workers In Nigeria - Check Open Positions',
              'New Container Houses In Ilobu: Take A Look At The Prices!',
              'Air Conditioners Without External Unit (Click To See Prices!)',
              'Discover Budget-Friendly 10,000W Solar Kits Today',
            ].map((title, i) => (
              <div key={i} className="space-y-2">
                <Image
                  src="/placeholder.svg"
                  alt={title}
                  width={200}
                  height={150}
                  className="rounded object-cover aspect-video w-full"
                />
                <h3 className="text-sm hover:text-primary">
                  <Link href="#">{title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground">Sponsored</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Story */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%206.13.51%E2%80%AFAM-oRzsAGJVsWvcN0ZWgEVvnh4jOwIhhZ.png"
              alt="Featured news"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full aspect-video"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">U.S.</Badge>
                <span className="text-sm text-muted-foreground">
                  3 hours ago
                </span>
              </div>
              <h1 className="text-2xl font-bold hover:text-primary">
                <Link href="#">
                  DC plane crash: Similar tragedy happened 43 years ago
                </Link>
              </h1>
              <p className="text-muted-foreground">
                Breaking news coverage of significant events unfolding in the
                nation's capital...
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Image
                  src="/placeholder.svg"
                  alt="News thumbnail"
                  width={200}
                  height={120}
                  className="rounded object-cover aspect-video w-[200px]"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Politics</Badge>
                  </div>
                  <h3 className="font-semibold hover:text-primary line-clamp-2">
                    <Link href="#">Related Breaking News Story {i}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Quick summary of the breaking news story and its
                    significance...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%206.13.51%E2%80%AFAM-oRzsAGJVsWvcN0ZWgEVvnh4jOwIhhZ.png"
              alt="Featured news"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full aspect-video"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">U.S.</Badge>
                <span className="text-sm text-muted-foreground">
                  3 hours ago
                </span>
              </div>
              <h1 className="text-2xl font-bold hover:text-primary">
                <Link href="#">
                  DC plane crash: Similar tragedy happened 43 years ago
                </Link>
              </h1>
              <p className="text-muted-foreground">
                Breaking news coverage of significant events unfolding in the
                nation's capital...
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Image
                  src="/placeholder.svg"
                  alt="News thumbnail"
                  width={200}
                  height={120}
                  className="rounded object-cover aspect-video w-[200px]"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Politics</Badge>
                  </div>
                  <h3 className="font-semibold hover:text-primary line-clamp-2">
                    <Link href="#">Related Breaking News Story {i}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Quick summary of the breaking news story and its
                    significance...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%206.13.51%E2%80%AFAM-oRzsAGJVsWvcN0ZWgEVvnh4jOwIhhZ.png"
              alt="Featured news"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full aspect-video"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">U.S.</Badge>
                <span className="text-sm text-muted-foreground">
                  3 hours ago
                </span>
              </div>
              <h1 className="text-2xl font-bold hover:text-primary">
                <Link href="#">
                  DC plane crash: Similar tragedy happened 43 years ago
                </Link>
              </h1>
              <p className="text-muted-foreground">
                Breaking news coverage of significant events unfolding in the
                nation's capital...
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Image
                  src="/placeholder.svg"
                  alt="News thumbnail"
                  width={200}
                  height={120}
                  className="rounded object-cover aspect-video w-[200px]"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Politics</Badge>
                  </div>
                  <h3 className="font-semibold hover:text-primary line-clamp-2">
                    <Link href="#">Related Breaking News Story {i}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Quick summary of the breaking news story and its
                    significance...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <GenFooter />
    </div>
  );
}
