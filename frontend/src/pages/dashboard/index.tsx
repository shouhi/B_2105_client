import { RadioGroup } from '@headlessui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '../../components/shared/Button'

import { Layout } from '../../components/shared/Layout'
import { EXAMPLE_OCCUPATION } from '../../models/occupation'
import { EXAMPLE_USER_01 } from '../../models/user'

const Dashboard: NextPage = () => {
  const [occupation, setOccupation] = useState<string | undefined>(undefined)
  const { push } = useRouter()

  const handleClickStartInterview = (value: string) => {
    if (value === undefined) {
      alert('選択してください')
      return
    }
    push({pathname: '/test', query: {id: value}})
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
          <p className="font-bold text-xl pl-2 mb-2">
            新規面接
          </p>
          <div className="rounded-xl w-full overflow-hidden shadow-lg bg-gray-50 py-5">
            <div className="w-96 m-8">
              <RadioGroup value={occupation} onChange={setOccupation} className="mb-5 w-full">
                <RadioGroup.Label className="font-bold text-lg">職種</RadioGroup.Label>
                <div className="flex space-x-5">
                  {EXAMPLE_OCCUPATION.map(({id, occupation, name}) => (
                    <RadioGroup.Option
                      key={id}
                      value={occupation}
                      className={({checked, active}) => (`
                        ${checked ? 'bg-blue-400' : ''}
                        ${active ? 'bg-blue-400' : ''}
                        relative rounded-md shadow-md px-5 py-4 cursor-pointer flex w-48
                      `)}
                    >
                      {({ checked, active }) => (
                        <span className={`
                          ${checked ? 'text-white' : ''}
                          ${active ? 'text-white' : ''}
                          text-center
                        `}>
                          {name}
                        </span>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <Button
                key="write memo"
                variant="solid-blue"
                className="px-4 h-10 w-full"
                onClick={() => handleClickStartInterview(occupation)}
              >
                面接練習
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
