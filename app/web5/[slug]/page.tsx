import GenFooter from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import InfoSec from '@/components/ui/info';

// This would typically come from your API or CMS
const getArticle = (slug: string) => {
  // Mock data - in a real app, fetch from API/database
  const articles = {
    'major-political-development': {
      title: 'Major Political Development Shapes Global Policy',
      content: `
        In a significant turn of events, major political developments are reshaping global policy frameworks and international relations. The implications of these changes are far-reaching and could affect various sectors of the global economy.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

        The Response and Initial Impact

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        • Key policy changes and their implications
        • International response and cooperation
        • Economic impact assessment
        • Future outlook and predictions

        Looking Forward

        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

        Expert Analysis and Commentary

        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      `,
      author: 'Daily News AI',
      date: '2025-02-05',
      category: 'Politics',
      image: 'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    },
    'economic-reforms': {
      title: 'Economic Reforms Signal Market Changes',
      content: `
        Recent economic reforms are signaling significant changes in global markets. Analysts predict these shifts could have long-lasting impacts on various industries and international trade relations.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

        Key Areas of Reform

        • Trade policies and international agreements
        • Fiscal and monetary strategies
        • Labor market regulations
        • Environmental and sustainability initiatives

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Market Reactions and Projections

        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

        Long-term Implications

        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      `,
      author: 'Daily News AI',
      date: '2025-02-04',
      category: 'Economy',
      image: 'https://ichef.bbci.co.uk/news/1536/cpsprodpb/9f5e/live/ad1a9f90-e4c8-11ef-8a40-954a179da503.jpg.webp',
    },
    // Add more articles as needed
  };

  return articles[slug as keyof typeof articles] || null;
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
            <Link href="/news" className="text-primary hover:underline">
              &larr; Back to News
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{article.category}</span>
                <span>•</span>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString()}
                </time>
              </div>
              <h1 className="text-4xl font-bold">{article.title}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span>By {article.author}</span>
              </div>
            </div>

            <Image
              src={article.image || '/placeholder.svg'}
              alt={article.title}
              width={800}
              height={450}
              className="rounded-lg object-cover w-full aspect-video"
            />

            <div className="prose prose-gray max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <InfoSec />

            <div className="flex items-center gap-4 pt-6 border-t">
              <Link href="/news" className="text-primary hover:underline">
                &larr; Back to News
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Advertisement Section */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Advertisement</h3>
              <div className="bg-muted aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Ad Space</span>
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
