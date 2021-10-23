import { Layout } from "../components/shared/Layout";
import { Button } from "../components/shared/Button";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-white font-family-karla">
      <div className="grid place-items-center mt-12 md:pt-0 md:px-24 lg:px-32">
        <Image src="/icon.png" width={250} height={200} />
        <p className="text-center text-xl font-bold mt-6">面接Tech</p>
        <div className="pt-6 pb-12">
          <p className="text-lm">
            今すぐ面接練習してみませんか？{" "}
            <Link href="/dashboard">
              <a className="text-blue-400">はじめる</a>
            </Link>
            <Image src="/mock/mockup.png" width={500} height={400} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
