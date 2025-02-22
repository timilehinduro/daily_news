import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"


export default function VideoPlayer({ src }: { src: string }) {
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
        {/* <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <Button variant="secondary" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="secondary" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
        </div> */}
      </div>
    )
  }