'use client'

import Link from 'next/link'
import { useState } from 'react'
import EngagementButtons from './engagement-buttons'
import CommentsModal from './comments-modal'

interface ArticleCardProps {
  news: {
    id: number
    title: string
    content: string
    comments: Array<{ id: number; text: string; created_at: string }>
    likes: Array<{ id: number; created_at: string }>
    shares: Array<{ id: number; platform: string; created_at: string }>
  }
}

export default function ArticleCard({ news }: ArticleCardProps) {
  const [showComments, setShowComments] = useState(false)

  return (
    <article className="border-b pb-8">
      <h2 className="text-2xl font-bold mb-4">
        <Link href={`/text-news/${news.id}`} className="hover:text-primary">
          {news.title}
        </Link>
      </h2>
      <p className="text-muted-foreground mb-4">
        {news.content.slice(0, 200)}...
      </p>
      <div className="flex items-center justify-between">
        <EngagementButtons
          newsId={news.id}
          initialLikes={news.likes.length}
          initialShares={news.shares.length}
        />
        <button
          onClick={() => setShowComments(true)}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <span>💬 {news.comments.length}</span>
        </button>
      </div>
      <Link
        href={`/text-news/${news.id}`}
        className="text-primary hover:underline mt-4 block"
      >
        Read more
      </Link>

      {showComments && (
        <CommentsModal
          newsId={news.id}
          initialComments={news.comments}
          onClose={() => setShowComments(false)}
        />
      )}
    </article>
  )
}