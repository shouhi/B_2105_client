import { ClockIcon, UserIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useRef, useState, useCallback, useEffect, useContext } from 'react'
import Webcam from 'react-webcam'

import { AuthContext, QuestionsContext } from '../../components/auth/AuthProvider'
import { Button } from '../../components/shared/Button'
import { Layout } from '../../components/shared/Layout'
import { QuestionType } from '../../types/types'

const Test: NextPage = () => {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [interviewQuestions, setInterviewQuestions] = useState<QuestionType[]>([])
  const [questionId, setQuestionId] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()
  const [interviewTime, setInterviewTime] = useState('00:00')

  const { query } = useRouter()
  const { currentUser } = useContext(AuthContext)
  const { questions } = useContext(QuestionsContext)
  const getIdToken = currentUser?.getIdToken()

  useEffect(() => {
    if (query.id === 'practice') {
      const randomNumber = Math.floor(Math.random() * questions.length)
      console.log(randomNumber)
      setInterviewQuestions([questions[randomNumber]])
      return
    }
    setInterviewQuestions(questions)
  }, [questions])

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => prev.concat(data))
      }
    },
    [setRecordedChunks]
  )
  const mesureTheTimeOfTheInterview = useCallback(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const time = Date.now() - startTime
      const seconds = Math.floor(time / 1000)
      const minutes = Math.floor(seconds / 60)
      const setTime = `${String(minutes).padStart(2, '0')}:${String(seconds - minutes * 60).padStart(2, '0')}`
      setInterviewTime(setTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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
    mesureTheTimeOfTheInterview()
  }, [webcamRef, setCapturing, mediaRecorderRef])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [recordedChunks, setCapturing, mediaRecorderRef])

  const handleDownload = useCallback(() => {
    const interviewId = "6QgXzpKQlixQHrSYpH87"
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      })
      // blob to file
      const file = new File([blob], 'video.mp4', {
        type: 'video/mp4'
      })

      const formData = new FormData()
      formData.append('interview_id', interviewId)
      formData.append('file', file)

      getIdToken.then((idToken) => {
        const axiosBase = axios.create({
          baseURL: 'https://jphacks-server-ydpiyrw4ja-dt.a.run.app',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
            'X-Requested-With': 'XMLHttpRequest',
          }
        })
        axiosBase.post('/upload_movie', formData).then((res) => {
          if (res.status === 201) {
            // push('/result')
          }
        })
      })
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
    if (query.id === 'practice') {
      setCurrentQuestion(interviewQuestions[0])
      return
    }
    setCurrentQuestion(interviewQuestions[questionId])
  }, [questionId, interviewQuestions, currentQuestion])

  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-3 bg-gray-100">
        <div className="rounded-xl max-w-5xl container mx-auto my-10 overflow-hidden shadow-lg bg-gray-50 p-10">
          {capturing ? (
            <div className="flex items-center">
              <UserIcon className="w-12 h-12" />
              <p className="rounded-md w-full h-12 bg-blue-100 text-xl flex items-center justify-center">
                {currentQuestion.text}
              </p>
              <div className="w-10 ml-3">
                <ClockIcon className="w-10 h-10" />
                <p>{interviewTime}</p>
              </div>
            </div>
          ) : (
            <p className="rounded-md w-full bg-blue-100 text-xl flex items-center justify-center h-12">
              「開始する」を押すと、面接が始まります
            </p>
          )}
          <Webcam audio={true} ref={webcamRef} className="w-full my-3" />
          {capturing ? (
            <div className="flex space-between">
              {questionId < interviewQuestions.length - 1 && (
                  <Button
                    variant="solid-blue"
                    onClick={handleClickNextQuestion}
                    className="px-4 h-10"
                  >
                    次の質問へ
                  </Button>
              )}
              <Button
                variant="solid-red"
                onClick={handleStopCaptureClick}
                className="px-4 h-10 ml-auto"
              >
                面接を終了する
              </Button>
            </div>
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
