import type { NextPage } from "next";

import { Button } from "../../components/shared/Button";
import { Layout } from "../../components/shared/Layout";
import { EXAMPLE_USER_01 } from "../../models/user";

const Dashboard: NextPage = () => {
  return (
    <Layout
      left="icon"
      right={[
        <Button
          key="write memo"
          variant="solid-blue"
          linkProps={{ href: "/test" }}
          className="px-4 h-10"
        >
          面接練習
        </Button>,
      ]}
    >
      <div className="p-10 bg-gray-100">
        <div className="rounded-xl max-w-5xl overflow-hidden shadow-lg bg-gray-50 py-5">
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
      </div>
    </Layout>
  );
};

export default Dashboard;
