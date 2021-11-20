import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { githubProvider, googleProvider } from '../components/auth/AuthMethods'
import { AuthContext } from '../components/auth/AuthProvider'

import socialMediaAuth from '../components/auth/SocialMediaAuth'
import { GithubIcon } from '../components/icon/GithubIcon'
import { GoogleIcon } from '../components/icon/GoogleIcon'
import { Button } from '../components/shared/Button'

const Signin: NextPage = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    currentUser && router.push('/dashboard')
  }, [currentUser])

  const handleOnClick = async provider => {
    const res = await socialMediaAuth(provider)
    console.log(res)
  }
  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        {/* 左側 */}
        <div className="w-full md:w-1/2 flex flex-col bg-tazer-blue">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32" />
        </div>
        {/* 右側 */}
        <div className="w-full md:w-1/2 flex flex-col bg-light-blue">
          <div className="flex flex-col  my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-bold mt-28 text-tazer-blue">
              Welcome back!
            </p>
            <Image src="/tayzer.png" width={200} height={250} />
            <Button
              variant="solid-black"
              className="py-4 w-72 sm:w-80 mt-7"
              onClick={() => {
                handleOnClick(githubProvider)
              }}
            >
              <div className="flex">
                <GithubIcon iconColor="white" className="mr-3" />
                <span>Sign in with Github</span>
              </div>
            </Button>
            <Button
              variant="solid-white"
              className="py-4 w-72 sm:w-80 mt-5"
              onClick={() => {
                handleOnClick(googleProvider)
              }}
            >
              <div className="flex">
                <GoogleIcon className="mr-3" />
                <span>Sign in with Google</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signin
