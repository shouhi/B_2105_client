import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
