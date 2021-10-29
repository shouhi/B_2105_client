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
  { subject: 'anger', A: 120, B: 110, fullMark: 150 },
  { subject: 'surprise', A: 98, B: 130, fullMark: 150 },
  { subject: 'disgust', A: 86, B: 130, fullMark: 150 },
  { subject: 'sadness', A: 99, B: 100, fullMark: 150 },
  { subject: 'contempt', A: 85, B: 90, fullMark: 150 },
  { subject: 'fear', A: 65, B: 85, fullMark: 150 },
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
              outerRadius={250} // レーダーチャート全体の大きさ
              width={600} // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
              height={600} // レーダーチャートが記載される高さ
              data={radardata} // 表示対象のデータ
            >
              {/* レーダーチャートの蜘蛛の巣のような線 */}
              <PolarGrid />
              {/* 項目を決めるデータのキー(サンプルでいう数学や歴史) */}
              <PolarAngleAxis dataKey="subject" />

              {/* 目安となる数値が表示される線を指定  */}
              <PolarRadiusAxis
                angle={30} // 中心点から水平を0°とした時の角度 垂直にしたいなら90を指定
                domain={[0, 150]} // リストの１番目の要素が最小値、2番目の要素が最大値
              />

              {/* レーダーを表示 */}
              <Radar
                name="あなた" // そのチャートが誰のデータか指定(チャート下にここで指定した値が表示される)
                dataKey="A" // 表示する値と対応するdata内のキー
                stroke="#8884d8" // レーダーの外枠の色
                fill="#8884d8" // レーダー内の色
                fillOpacity={0.5} // レーダー内の色の濃さ(1にすると濃さMAX)
              />
              {/* ２個目のレーダー */}
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
