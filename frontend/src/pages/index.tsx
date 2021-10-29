import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { GithubIcon } from '../components/icon/GithubIcon'
import { Button } from '../components/shared/Button'

import { addInterview } from './api/firestore'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-white font-family-karla">
      <div className="grid place-items-center mt-12 md:pt-0 md:px-24 lg:px-32">
        <Image src="/icon.png" width={250} height={200} />
        <p className="text-center text-xl font-bold mt-6">面接Tech</p>
        <div className="pt-6 pb-12">
          <div className="flex items-end">
            <div>
              <p>今すぐ面接練習してみませんか？</p>
              <div className="mt-6">
                <p>
                  <Link href="/signup">
                    <a className="text-blue-400">はじめる</a>
                  </Link>
                </p>
                <p>
                  <span>アカウントをお持ちの方は</span>
                  <Link href="/signin">
                    <a className="text-blue-400">こちら</a>
                  </Link>
                </p>
                <Button
                  variant="solid-black"
                  className="py-4 w-72 sm:w-80 mt-7"
                  onClick={() => {
                    addInterview({
                      anger: 0,
                      anxios: 0,
                      confidence: 0,
                      contempt: 0,
                      disgust: 0,
                      fear: 0,
                      happiness: 0,
                      honest: 0,
                      leadership: 0,
                      narvous: 0,
                      sadness: 0,
                      surprise: 0,
                    })
                  }}
                >
                  <div className="flex">
                    <GithubIcon iconColor="white" className="mr-3" />
                    <span>Add Firestore</span>
                  </div>
                </Button>
              </div>
            </div>
            <Image src="/mock/mockup.png" width={500} height={400} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
