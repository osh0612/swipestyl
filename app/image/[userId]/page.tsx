'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Camera, Image as ImageIcon, ArrowLeft, Repeat } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function CameraInterface() {
  const [isFrontCamera, setIsFrontCamera] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const params = useParams()
  const userId = params.userId as string

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? 'user' : 'environment' }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
    }
  }, [isFrontCamera])

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream
    const tracks = stream?.getTracks()
    tracks?.forEach(track => track.stop())
  }, [])

  const toggleCamera = useCallback(() => {
    stopCamera()
    setIsFrontCamera(prev => !prev)
    startCamera()
  }, [startCamera, stopCamera])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL('image/jpeg')
        setCapturedImage(imageDataUrl)
      }
    }
  }, [])

  const selectFromGallery = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setCapturedImage(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }, [])

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  const goBack = () => {
    router.push(`/home/${userId}`)
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex justify-between items-center p-4">
        <button onClick={goBack} className="z-10">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <span className="text-lg font-semibold">Image</span>
        <div className="w-6 h-6"></div> {/* Placeholder for alignment */}
      </div>
      <div className="flex-grow relative mx-4 my-2">
        <div className="absolute inset-0 border-8 border-yellow-500 rounded-lg"></div>
        <div className="absolute inset-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="flex justify-around items-center p-4">
        <button onClick={selectFromGallery} className="p-2">
          <ImageIcon className="w-6 h-6" />
        </button>
        <button onClick={capturePhoto} className="p-4 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors">
          <Camera className="w-8 h-8 text-black" />
        </button>
        <button onClick={toggleCamera} className="p-2">
          <Repeat className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}