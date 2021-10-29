import type { NextPage } from 'next'

import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'

import { Layout } from '../../components/shared/Layout'

const Test: NextPage = () => {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => prev.concat(data))
      }
    },
    [setRecordedChunks]
  )

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    })
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    )
    mediaRecorderRef.current.start()
  }, [webcamRef, setCapturing, mediaRecorderRef])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [mediaRecorderRef, webcamRef, setCapturing])

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      })
      const url = URL.createObjectURL(blob)
      console.log(url)
      window.URL.revokeObjectURL(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-10 bg-gray-100">
        <div className="rounded-xl max-w-5xl  container mx-auto overflow-hidden shadow-lg bg-gray-50 p-10">
          <Webcam audio={false} ref={webcamRef} className="w-full" />
          {capturing ? (
            <Button
              variant="solid-red"
              onClick={handleStopCaptureClick}
              className="px-4 h-10"
            >
              Stop Capture
            </Button>
          ) : (
            <Button
              variant="solid-blue"
              onClick={handleStartCaptureClick}
              className="px-4 h-10"
            >
              開始する
            </Button>
          )}
          {recordedChunks.length > 0 && (
            <Button onClick={handleDownload}>download</Button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Test
