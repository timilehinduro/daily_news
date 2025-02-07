"use client"

import GenFooter from "@/components/ui/footer"
import Header from "@/components/ui/header"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import InfoSec from "@/components/ui/info"

const getVideoArticle = (slug: string) => {
  // Mock data - in a real app, fetch from API/database
  const videoArticles = {
    "political-summit-concludes": {
      title: "Breaking: Major Political Summit Concludes",
      content: `
        World leaders have reached a landmark agreement on climate change policies at the recent global summit. Our correspondent reports from the event, highlighting key decisions and their potential impact on international environmental efforts.

        The summit, which lasted for three days, saw intense negotiations and debates among representatives from over 190 countries. The final agreement, dubbed the "Global Climate Accord," sets ambitious targets for reducing greenhouse gas emissions and promotes the adoption of renewable energy sources worldwide.

        Key points of the agreement include:
        • A commitment to reduce global carbon emissions by 50% by 2030
        • Increased funding for developing nations to transition to clean energy
        • Establishment of an international carbon trading system
        • Enhanced measures for protecting biodiversity and forests

        While the agreement has been hailed as a significant step forward, some critics argue that the targets don't go far enough to address the urgency of the climate crisis. In the coming months, individual nations will need to ratify the agreement and implement domestic policies to meet these new global standards.

        As the world reacts to this groundbreaking accord, economists and environmental experts are already analyzing its potential effects on global markets, energy sectors, and international relations. Stay tuned for more in-depth coverage and expert analysis on this developing story.
      `,
      author: "Daily News AI",
      date: "2025-02-05",
      category: "Politics",
      videoUrl: "https://www.youtube.com/watch?v=W5MR6Jy3SLU",
      duration: "5:23",
    },
    "tech-giant-unveils-ai": {
      title: "Tech Giant Unveils Revolutionary AI",
      content: `
        In a groundbreaking announcement, Silicon Valley's leading tech company has unveiled its latest artificial intelligence system, promising to transform multiple industries. Our technology correspondent brings you an exclusive look at this cutting-edge AI and its potential applications.

        The new AI system, named "Nexus," is said to be capable of processing and analyzing vast amounts of data at unprecedented speeds, making it particularly valuable for fields such as healthcare, finance, and scientific research. According to the developers, Nexus can understand and generate human-like text, recognize and analyze complex visual data, and even assist in creative processes like music composition and art creation.

        Key features of Nexus include:
        • Advanced natural language processing capabilities
        • Real-time data analysis and prediction
        • Adaptive learning algorithms that improve performance over time
        • Integration with existing software and hardware systems

        While the announcement has generated excitement in the tech world, it has also raised concerns about potential job displacement and ethical considerations surrounding AI decision-making. Privacy advocates are calling for transparent guidelines on how Nexus will handle and protect sensitive data.

        Industry experts predict that this new AI system could lead to significant advancements in personalized medicine, financial forecasting, and climate modeling. However, they also caution that careful regulation and ethical oversight will be crucial as the technology is implemented across various sectors.

        As we continue to explore the implications of this revolutionary AI, we'll be speaking with ethicists, industry leaders, and policymakers to understand how Nexus might shape our future. Stay tuned for ongoing coverage of this developing story.
      `,
      author: "Daily News AI",
      date: "2025-02-04",
      category: "Technology",
      videoUrl: "https://www.youtube.com/watch?v=W5MR6Jy3SLU",
      duration: "3:45",
    },
    // Add more video articles as needed
  }

  return videoArticles[slug as keyof typeof videoArticles] || null
}

export default function VideoArticlePage({ params }: { params: { slug: string } }) {
  const article = getVideoArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/video-news" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Video News
        </Link>

        <div className="grid md:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{article.category}</span>
                <span>•</span>
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
              </div>
              <h1 className="text-4xl font-bold">{article.title}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span>By {article.author}</span>
              </div>
            </div>

            <VideoPlayer src={article.videoUrl} />

            <div className="prose prose-gray max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <InfoSec />

            <div className="flex items-center gap-4 pt-6 border-t">
              <Link href="/video-news" className="text-primary hover:underline">
                &larr; Back to Video News
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Videos */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Related Videos</h3>
              <div className="space-y-4">
                <Link href="#" className="block hover:text-primary">
                  Global Response to Climate Agreement
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Analysis: Economic Impact of New Policies
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Interview: Lead Negotiator Speaks Out
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Climate Activists React to Summit Outcome
                </Link>
                <Link href="#" className="block hover:text-primary">
                  Next Steps: Implementing the Global Accord
                </Link>
              </div>
            </section>

            {/* Share Video */}
            <section className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Share This Video</h3>
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
                <button className="w-full text-left text-sm text-muted-foreground hover:text-primary">Copy Link</button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>Daily News - Your Source for Latest Video Updates</p>
          <p>&copy; {new Date().getFullYear()} Daily News. All rights reserved.</p>
        </div>
      </div>

      <GenFooter />
    </div>
  )
}

function VideoPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isYouTube, setIsYouTube] = useState(false)
  const [youtubeId, setYoutubeId] = useState("")

  useEffect(() => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (youtubeRegex.test(src)) {
      setIsYouTube(true)
      const id = src.split("v=")[1] || src.split("/").pop()
      setYoutubeId(id || "")
    } else {
      setIsYouTube(false)
    }
  }, [src])

  const togglePlay = () => {
    if (isYouTube) {
      const iframe = document.querySelector("iframe")
      if (iframe) {
        const message = isPlaying
          ? '{"event":"command","func":"pauseVideo","args":""}'
          : '{"event":"command","func":"playVideo","args":""}'
        iframe.contentWindow?.postMessage(message, "*")
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (isYouTube) {
      const iframe = document.querySelector("iframe")
      if (iframe) {
        const message = isMuted
          ? '{"event":"command","func":"unMute","args":""}'
          : '{"event":"command","func":"mute","args":""}'
        iframe.contentWindow?.postMessage(message, "*")
      }
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  return (
    <div className="relative">
      {isYouTube ? (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video rounded-lg"
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="w-full aspect-video rounded-lg"
          autoPlay={isPlaying}
          muted={isMuted}
          loop
        />
      )}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <Button variant="secondary" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button variant="secondary" size="icon" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  )
}

