
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ArticleCardProps {
  news: {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
    comments: Array<{ id: number; text: string; created_at: string }>;
    likes: Array<{ id: number; created_at: string }>;
    shares: Array<{ id: number; platform: string; created_at: string }>;
  };
  url: string;
}

export default function ArticleCard({ news, url }: ArticleCardProps) {
  return (
    <article className="border-b pb-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <span>{news.category || 'General'}</span>
        <span>•</span>
        <time dateTime={news.created_at}>
          {new Date(news.created_at).toLocaleDateString()}
        </time>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        <Link href={`${url}/${news.id}`} className="hover:text-primary">
          {news.title}
        </Link>
      </h2>
      <div className="prose max-w-3xl">
        <ReactMarkdown>{news.content.slice(0, 200)}</ReactMarkdown>
      </div>
      <Link
        href={`${url}/${news.id}`}
        className="text-primary hover:underline my-4 block"
      >
        <span className="flex items-center gap-1">
          Read more <ArrowRight />
        </span>
      </Link>
    </article>
  );
}
