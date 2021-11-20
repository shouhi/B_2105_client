import { ClockIcon, UserIcon } from '@heroicons/react/outline'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRef, useState, useCallback, useEffect, useContext } from 'react'
import Webcam from 'react-webcam'

import {
  AuthContext,
  QuestionsContext,
} from '../../components/auth/AuthProvider'
import { Button } from '../../components/shared/Button'
import { Layout } from '../../components/shared/Layout'
import { Loading } from '../../components/shared/Loading'
import { Modal } from '../../components/shared/Modal'
import { QuestionType } from '../../types/types'
import { getInterviewResult } from '../api/firestore'

const Test: NextPage = () => {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [interviewQuestions, setInterviewQuestions] = useState<QuestionType[]>(
    []
  )
  const [questionId, setQuestionId] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()
  const [interviewTime, setInterviewTime] = useState('00:00')
  const [modalOpen, setModalOpen] = useState(false)

  const { query, push } = useRouter()
  const { currentUser } = useContext(AuthContext)
  const { questions } = useContext(QuestionsContext)
  const getIdToken = currentUser?.getIdToken()

  useEffect(() => {
    const videoList = Array.from(document.getElementsByTagName('video'))
    videoList.forEach(video => {
      video.muted = true
    })
    if (query.id === 'practice') {
      const randomNumber = Math.floor(Math.random() * questions.length)
      setInterviewQuestions([questions[randomNumber]])
      return
    }
    const randomQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    setInterviewQuestions(randomQuestions)
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
      const setTime = `${String(minutes).padStart(2, '0')}:${String(
        seconds - minutes * 60
      ).padStart(2, '0')}`
      setInterviewTime(setTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleStartCaptureClick = useCallback(async () => {
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

  const handleDownload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      })
      // blob to file
      const file = new File([blob], 'video.mp4', {
        type: 'video/mp4',
      })

      const formData = new FormData()
      formData.append('file', file)

      getIdToken.then(idToken => {
        const axiosBase = axios.create({
          baseURL: 'https://jphacks-server-3gabclop4q-dt.a.run.app/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
        axiosBase.post('/create_interview', formData).then(async res => {
          if (res.status === 201) {
            const result = await getInterviewResult(res.data['interview_id'])
            setModalOpen(true)
            setTimeout(() => {
              if (result !== null) {
                setModalOpen(false)
                push({
                  pathname: '/result',
                  query: { id: res.data['interview_id'] },
                })
              }
              setModalOpen(false)
            }, 5000)
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
        <div className="max-w-4xl mx-auto my-10 overflow-hidden bg-gray-50 p-5">
          {capturing ? (
            <div className="flex items-center">
              <UserIcon className="w-12 h-12" />
              <p className="rounded-md w-full h-12 bg-blue-100 text-xl flex items-center justify-center">
                {currentQuestion.text}
              </p>
              <div className="w-10 mx-2">
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
          {modalOpen && (
            <Modal
              title="解析しています。しばらくお待ち下さい。"
              content={<Loading />}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Test
