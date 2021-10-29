import type { NextPage } from 'next'
// import { useRouter } from 'next/router'

import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'

import { Button } from '../../components/shared/Button'
import { Layout } from '../../components/shared/Layout'
import { EXAMPLE_QUESTIONS } from '../../models/questions'
import { QuestionType } from '../../types/types'

const Test: NextPage = () => {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [interviewQuestions, setInterviewQuestions] = useState<QuestionType[]>([])
  const [questionId, setQuestionId] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()

  // const { query } = useRouter()

  useEffect(() => {
    // if (query.id === 'practice') {
    //   const questions = shuffle(EXAMPLE_QUESTIONS)
    //   setInterviewQuestions(questions)
    // }
    setInterviewQuestions(EXAMPLE_QUESTIONS)
  }, [interviewQuestions])

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
  }, [recordedChunks, setCapturing, mediaRecorderRef])

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      })
      const url = URL.createObjectURL(blob)
      // TODO: connection with backend
      window.open(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  useEffect(() => {
    handleDownload()
  }, [recordedChunks, handleDownload])

  const handleClickNextQuestion = () => {
    const nextId = questionId + 1
    setQuestionId(nextId)
  }

  useEffect(() => {
    setCurrentQuestion(interviewQuestions[questionId])
  }, [questionId, interviewQuestions, currentQuestion])

  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-3 bg-gray-100">
        <div className="rounded-xl max-w-5xl container mx-auto overflow-hidden shadow-lg bg-gray-50 p-10">
          <div className="">
            {capturing ? (
              <div>
                <p>{currentQuestion.question}</p>
              </div>
            ) : (
              <p className="font-md">開始するを押すと、面接が始まります</p>
            )}
          </div>
          <Webcam audio={true} ref={webcamRef} className="w-full" />
          {capturing ? (
            <>
              {questionId < interviewQuestions.length - 1 && (
                  <Button
                    variant="solid-blue"
                    onClick={handleClickNextQuestion}
                    className="px-4 h-10"
                  >
                    Next Question
                  </Button>
              )}
              <Button
                variant="solid-red"
                onClick={handleStopCaptureClick}
                className="px-4 h-10"
              >
                Stop Capture
              </Button>
            </>
          ) : (
            <Button
              variant="solid-blue"
              onClick={handleStartCaptureClick}
              className="px-4 h-10"
            >
              開始する
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Test
