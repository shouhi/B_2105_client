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

  // const { currentUser } = useContext(AuthContext)
  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-5 bg-gray-100">
        <div className="rounded-xl max-w-3xl overflow-hidden shadow-lg bg-gray-50 mx-10 my-5 py-10 inline-block">
          <div className="px-14 pt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2">
              #表情認識
            </span>
            <RadarChart
              cx={310} // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
              cy={310} // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
              outerRadius={250}
              width={620}
              height={620}
              data={result_emotions}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="feel" />

              <PolarRadiusAxis angle={50} domain={[0, 1]} />
              <Radar
                name="あなた"
                dataKey="A"
                stroke="#8884d8" // レーダーの外枠の色
                fill="#8884d8" // レーダー内の色
                fillOpacity={0.5} // レーダー内の色の濃さ(1にすると濃さMAX)
              />
              <Radar
                name="全国の平均"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.5}
              />

              {/* グラフの下のAさんBさんの表記 */}
              <Legend />
            </RadarChart>
          </div>
        </div>
        <div className="rounded-xl max-w-3xl overflow-hidden shadow-lg bg-gray-50 mx-10 my-5 py-10 inline-block">
          <div className="px-14 pt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2">
              #印象認識
            </span>
            <RadarChart
              cx={310} // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
              cy={310} // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
              outerRadius={250}
              width={620}
              height={620}
              data={result_impressions}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="feel" />

              <PolarRadiusAxis angle={50} domain={[0, 1]} />
              <Radar
                name="あなた"
                dataKey="A"
                stroke="#8884d8" // レーダーの外枠の色
                fill="#8884d8" // レーダー内の色
                fillOpacity={0.5} // レーダー内の色の濃さ(1にすると濃さMAX)
              />
              <Radar
                name="全国の平均"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.5}
              />

              {/* グラフの下のAさんBさんの表記 */}
              <Legend />
            </RadarChart>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Result
