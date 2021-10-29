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

const radardata = [
  { feel: 'anger', A: 120, B: 110, fullMark: 150 }, //A = 自分   B = 平均
  { feel: 'surprise', A: 98, B: 130, fullMark: 150 },
  { feel: 'disgust', A: 86, B: 130, fullMark: 150 },
  { feel: 'sadness', A: 99, B: 100, fullMark: 150 },
  { feel: 'contempt', A: 85, B: 90, fullMark: 150 },
  { feel: 'fear', A: 65, B: 85, fullMark: 150 },
]

const Result: NextPage = () => {
  // const { push } = useRouter()

  // const { currentUser } = useContext(AuthContext)
  return (
    <Layout left="icon" right={['profile']}>
      <div className="p-5 bg-gray-100">
        <div className="rounded-xl max-w-3xl overflow-hidden shadow-lg bg-gray-50  my-5 inline-block">
          <div className="px-6 pt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2">
              #表情認識
            </span>
            <RadarChart
              cx={300} // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
              cy={300} // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
              outerRadius={250}
              width={600}
              height={600}
              data={radardata}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="feel" />

              <PolarRadiusAxis angle={30} domain={[0, 150]} />
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
