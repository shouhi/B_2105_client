import type { NextPage } from 'next'

// import { useRouter } from 'next/router'
// import { useContext } from 'react'

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

// import { AuthContext } from '../../components/auth/AuthProvider'
import { Layout } from '../../components/shared/Layout'
// import { getResultMeotions } from '../api/firestore'

const result_emotions = [
  { feel: 'anger', A: 0, B: 0.5, fullMark: 1 }, //A = 自分   B = 平均
  { feel: 'surprise', A: 0.6083136194660358, B: 0.5, fullMark: 1 },
  { feel: 'disgust', A: 0.472974367823748, B: 0.5, fullMark: 1 },
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

const Result: NextPage = () => {
  // const { push } = useRouter()
  const colors = tailwindConfig.theme.extend.colors

  // const { currentUser } = useContext(AuthContext)
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
                  <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor={colors.neon.blue} />
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
                  <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor={colors.neon.green} />
                </filter>
              </defs>
              <Radar
                name="全国の平均"
                dataKey="B"
                stroke={colors.neon.green}
                fill={colors.neon.lightGreen}
                filter='url(#nationalData)'
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
                  <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor={colors.neon.blue} />
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
                  <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor={colors.neon.green} />
                </filter>
              </defs>
              <Radar
                name="全国の平均"
                dataKey="B"
                stroke={colors.neon.green}
                fill={colors.neon.lightGreen}
                filter='url(#nationalData)'
                fillOpacity={0.4}
              />

              {/* グラフの下のAさんBさんの表記 */}
              <Legend />
            </RadarChart>
          </div>
        </div>
        <div className="col-start-2 col-span-2 my-6">
          <Button variant="solid-blue" linkProps={{href: '/dashboard'}} className="py-4">
            ホームへ戻る
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Result
