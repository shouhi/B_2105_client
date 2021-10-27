import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Layout } from '../../components/shared/Layout'
import { EXAMPLE_USER_01 } from '../../models/user'
import { InterviewMode } from '../../utils/mode'

const Dashboard: NextPage = () => {
  const { push } = useRouter()

  const handleClickStartInterview = (value: string) => {
    if (value === undefined) {
      alert('選択してください')
      return
    }
    push({ pathname: '/test', query: { id: value } })
  }

  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-10 bg-gray-100">
        {/* UserInfo */}
        <div className="rounded-xl max-w-5xl overflow-hidden shadow-lg bg-gray-50 py-5 my-5">
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2">
              🦔 Hello ! {EXAMPLE_USER_01.name} さん
            </div>
            <p className="text-gray-700 text-base">
              {EXAMPLE_USER_01.discription}
            </p>
          </div>
          <div className="px-6 pt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #TechUni
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #アプリ開発
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #機械学習
            </span>
          </div>
        </div>
        {/* NewInterview */}
        <div className="my-10">
          <p className="font-bold text-xl pl-2 mb-2">新規面接</p>
          <div className="rounded-xl max-w-5xl overflow-hidden shadow-lg bg-gray-50 py-5 flex justify-center">
            <div className="m-8">
              <p className="font-bold text-lg mb-5">面接モード選択</p>
              <div className="flex space-x-16">
                {InterviewMode.map(({ id, mode, name }) => (
                  <div key={id}>
                    <div
                      className="
                        rounded-md shadow-lg cursor-pointer flex items-center justify-center
                        w-80 h-80 bg-blue-500 text-gray-50 font-bold text-lg
                        hover:bg-opacity-50 transition ease-in-out duration-300
                      "
                      onClick={() => handleClickStartInterview(mode)}
                    >
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
