import type { NextPage } from 'next'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

import { Layout } from '../../components/shared/Layout'

const videoConstraints = {
  width: 100,
  height: 50,
  facingMode: 'user',
}

const Test: NextPage = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false)
  const webcamRef = useRef<Webcam>(null)

  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-10 bg-gray-100">
        <div className="rounded-xl max-w-5xl container mx-auto overflow-hidden shadow-lg bg-gray-50 py-5">
          {isCaptureEnable || (
            <button onClick={() => setCaptureEnable(true)}>開始</button>
          )}
          {isCaptureEnable && (
            <>
              <div>
                <button onClick={() => setCaptureEnable(false)}>終了</button>
              </div>
              <div>
                <Webcam
                  audio={false}
                  width={1000}
                  ref={webcamRef}
                  videoConstraints={videoConstraints}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Test
