import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
        <div className="w-full max-w-[600px] mx-auto">
          <h1 className="text-6xl mb-4"> Deepfake Detection</h1>
          <p className="text-2xl text-white/60 mb-4">
            An AI assissted app to detect Deepfake Audio for Social Engineering
          </p>
          <div>
            <Link href="/dashboard">
              <button className="bg-blue-400 px-4 py-4 rounded-lg text-xl">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
