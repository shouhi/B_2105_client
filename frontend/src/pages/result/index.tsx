// import { DocumentData } from 'firebase/firestore'
import type { NextPage } from 'next'
// import { useRouter } from 'next/router'
// import { useCallback, useEffect, useState } from 'react'

import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

import tailwindConfig from '../../../tailwind.config'
import { Button } from '../../components/shared/Button'

import { Layout } from '../../components/shared/Layout'
// import { getAsString } from '../../utils/function'
// import { getInterviewResult } from '../api/firestore'

const Result: NextPage = () => {
  // const [resultEmotions, setResultEmotionst] = useState<DocumentData>()
  // const [resultImpressions, setResultImpressions] = useState<DocumentData>()
  const colors = tailwindConfig.theme.extend.colors
  // const router = useRouter()
  // const result_id = getAsString(router.query.id)

  // const getResult = useCallback(async () => {
  //   console.log(result_id)
  //   const result = await getInterviewResult(result_id)
  //   console.log(`undefined??${result}`)
  //   if (result != undefined) {
  //     console.log(result)
  //     setResultEmotionst(result['result_emotions'])
  //     setResultImpressions(result['result_impressions'])
  //   } else {
  //     return
  //   }
  // }, [setResultEmotionst, setResultImpressions])

  // useEffect(() => {
  //   getResult()
  // }, [getResult])
  // console.log(resultEmotions)
  // console.log(resultImpressions)
  // console.log(resultEmotions['anger'])

  // const result_emotions = [
  //   { feel: 'anger', A: resultEmotions['anger'], B: 0.5, fullMark: 1 }, //A = 自分   B = 平均
  //   { feel: 'surprise', A: resultEmotions['surprise'], B: 0.5, fullMark: 1 },
  //   { feel: 'disgust', A: resultEmotions['disgust'], B: 0.5, fullMark: 1 },
  //   { feel: 'sadness', A: resultEmotions['sadness'], B: 0.5, fullMark: 1 },
  //   { feel: 'contempt', A: resultEmotions['contempt'], B: 0.5, fullMark: 1 },
  //   { feel: 'fear', A: resultEmotions['fear'], B: 0.5, fullMark: 1 },
  //   { feel: 'happiness', A: resultEmotions['happiness'], B: 0.5, fullMark: 1 },
  // ]

  const result_emotions = [
    { feel: 'anger', A: 0, B: 0.5, fullMark: 1 }, //A = 自分   B = 平均
    { feel: 'surprise', A: 0.6083136194660358, B: 0.5, fullMark: 1 },
    { feel: 'disgust', A: 0.472974367823748, B: 0.5, fullMark: 1 },
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    { feel: 'sadness', A: 0.63518080432578575, B: 0.5, fullMark: 1 },
    { feel: 'contempt', A: 0.2689760054072322, B: 0.5, fullMark: 1 },
    { feel: 'fear', A: 0.4246487826268, B: 0.5, fullMark: 1 },
    { feel: 'happiness', A: 0.908752957080095, B: 0.5, fullMark: 1 },
  ]

  const result_impressions = [
    { feel: 'anxious', A: -32.762314032014345, B: 0.5, fullMark: 100 }, //A = 自分   B = 平均
    { feel: 'confidence', A: 0.6083136194660358, B: 0.5, fullMark: 100 },
    { feel: 'honest', A: 35.90665310328858, B: 0.5, fullMark: 100 },
    { feel: 'leadership', A: 33.35709336192617, B: 0.5, fullMark: 100 },
    { feel: 'nervous', A: -26.578883152181138, B: 0.5, fullMark: 100 },
    { feel: 'feaniceCoworkerr', A: 34.52420441911433, B: 0.5, fullMark: 100 },
  ]

  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-5 grid grid-cols-4 gap-4 bg-result w-full">
        <div className="overflow-hidden py-10 inline-block col-span-2 grid-cols-2">
          <div className="px-6 pt-4">
            <span className="inline-block px-3 py-1 text-xl font-semibold text-white">
              #表情認識
            </span>
            <RadarChart
              cx={310} // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
              cy={310} // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
              outerRadius={240}
              width={600}
              height={600}
              data={result_emotions}
              className="mx-auto"
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="feel" stroke="#fff" />

              <PolarRadiusAxis angle={50} domain={[0, 1]} />
              <defs>
                <filter id="userData">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="15"
                    floodColor={colors.neon.blue}
                  />
                </filter>
              </defs>
              <Radar
                name="あなた"
                dataKey="A"
                stroke={colors.neon.purple} // レーダーの外枠の色
                fill={colors.neon.purple}
                filter="url(#userData)" // レーダー内の色
                fillOpacity={0.4} // レーダー内の色の濃さ(1にすると濃さMAX)
              />
              <defs>
                <filter id="nationalData">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="15"
                    floodColor={colors.neon.green}
                  />
                </filter>
              </defs>
              <Radar
                name="全国の平均"
                dataKey="B"
                stroke={colors.neon.green}
                fill={colors.neon.lightGreen}
                filter="url(#nationalData)"
                fillOpacity={0.4}
              />

              {/* グラフの下のAさんBさんの表記 */}
              <Legend />
            </RadarChart>
          </div>
        </div>
        <div className="overflow-hidden py-10 inline-block col-span-2">
          <div className="px-6 pt-4">
            <span className="inline-block px-3 py-1 text-xl font-semibold text-gray-50">
              #印象認識
            </span>
            <RadarChart
              cx={310} // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
              cy={310} // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
              outerRadius={200}
              width={600}
              height={600}
              data={result_impressions}
              className="mx-auto"
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="feel" stroke="#fff" />

              <PolarRadiusAxis angle={50} domain={[0, 1]} />
              <defs>
                <filter id="userData">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="15"
                    floodColor={colors.neon.blue}
                  />
                </filter>
              </defs>
              <Radar
                name="あなた"
                dataKey="A"
                stroke={colors.neon.purple} // レーダーの外枠の色
                fill={colors.neon.purple}
                filter="url(#userData)" // レーダー内の色
                fillOpacity={0.4} // レーダー内の色の濃さ(1にすると濃さMAX)
              />
              <defs>
                <filter id="nationalData">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="15"
                    floodColor={colors.neon.green}
                  />
                </filter>
              </defs>
              <Radar
                name="全国の平均"
                dataKey="B"
                stroke={colors.neon.green}
                fill={colors.neon.lightGreen}
                filter="url(#nationalData)"
                fillOpacity={0.4}
              />

              {/* グラフの下のAさんBさんの表記 */}
              <Legend />
            </RadarChart>
          </div>
        </div>
        <div className="col-start-2 col-span-2 my-6">
          <Button
            variant="solid-blue"
            linkProps={{ href: '/dashboard' }}
            className="py-4"
          >
            ホームへ戻る
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Result
