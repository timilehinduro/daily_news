'use client'

import { useState } from 'react'

interface EngagementButtonsProps {
  newsId: number
  initialLikes: number
  initialShares: number
}

export default function EngagementButtons({ newsId, initialLikes, initialShares }: EngagementButtonsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [shares, setShares] = useState(initialShares)

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://daily-news-5k66.onrender.com/news/written/${newsId}/like/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        setLikes(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error liking news:', error)
    }
  }

  const handleShare = async () => {
    try {
      const response = await fetch(
        `https://daily-news-5k66.onrender.com/news/written/${newsId}/share/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        setShares(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error sharing news:', error)
    }
  }

  return (
    <div className="flex gap-4 text-sm text-muted-foreground">
      <button 
        onClick={handleLike}
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <span>❤️ {likes}</span>
      </button>
      <button 
        onClick={handleShare}
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <span>🔄 {shares}</span>
      </button>
    </div>
  )
}