import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import InfoSec from '@/components/ui/info';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function News() {
  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* News One */}
            <article className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4">
                <Link
                  href="/web4/major-political-development"
                  className="hover:text-primary"
                >
                  Major Political Development Shapes Global Policy
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">
                Breaking news coverage of significant political events and their
                impact on international relations. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore.
              </p>
              <Link
                href="/web4/major-political-development"
                className="text-primary hover:underline"
              >
                Read more
              </Link>
              {/* <Link className='pt-10' href="/ai-info"> */}
              <InfoSec />
              {/* </Link> */}
            </article>

            {/* News Two */}
            <article className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4">
                <Link
                  href="/web4/economic-reforms"
                  className="hover:text-primary"
                >
                  Economic Reforms Signal Market Changes
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">
                Analysis of recent economic policy changes and their potential
                impact on global markets. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip.
              </p>
              <Link
                href="/web4/economic-reforms"
                className="text-primary hover:underline"
              >
                Read more
              </Link>
              <InfoSec />
            </article>

            {/* News Three */}
            <article className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4">
                Technology Innovation Breakthrough
              </h2>
              <p className="text-muted-foreground mb-4">
                Latest developments in technology sector showing promising
                results for future applications. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore.
              </p>
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
              <InfoSec />
            </article>

            {/* News Four */}
            <article className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4">
                Environmental Initiative Launches
              </h2>
              <p className="text-muted-foreground mb-4">
                New global initiative aims to address climate change through
                collaborative effort. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia.
              </p>
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
              <InfoSec />
            </article>

            {/* News Five */}
            <article className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4">
                Cultural Event Draws Global Attention
              </h2>
              <p className="text-muted-foreground mb-4">
                International cultural festival celebrates diversity and
                promotes global understanding. Deserunt mollit anim id est
                laborum consectetur adipiscing elit.
              </p>
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
              <InfoSec />
            </article>
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
