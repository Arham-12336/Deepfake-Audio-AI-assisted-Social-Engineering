"use client";
import Layout from "@/components/layout";
import React, { useState } from "react";

const Dashboard = () => {
  const [state, setState] = useState("ready");
  const [percentage, setPercentage] = useState<any>();
  const [messageState, setMessageState] = useState<any>();
  const [file, setfile] = useState<File>();
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (file === undefined) {
      alert("please select a file ");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        console.log("response at the frontend : ", await res.json());
        let data = await res.json();
        setPercentage(data.result.percentage);
        console.log("percentage: ", data.result.percentage);
      }
    } catch (e) {
      console.error(e);
    }
    setState("sent");
  };
  const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setfile(target.files[0]);
  };
  return (
    <>
      <Layout>
        {state === "sent" && (
          <div>
            {" "}
            <div className="w-full overflow-x-hidden flex flex-col">
              <main className="w-full flex-grow p-6">
                <div className="flex flex-wrap mt-6">
                  <div className="w-full">
                    <h1 className="text-2xl pb-3 flex items-center justify-center">
                      Report
                    </h1>
                    <div className="p-6 bg-white">
                      <div className="flex flex-col justify-center items-center">
                        <div>
                          <p className="text-2xl text-black">Risk Rating</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div>
                            <img src="/alert.svg" width={60} height={60} />
                          </div>
                          <div>
                            <p className="text-black">High</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-xl pb-3 flex items-center"></p>
                    <div className="p-6 bg-white">
                      <div className="flex flex-row justify-between">
                        <div>
                          <h3 className="text-black">
                            Technical Anlaysis (Deep fake)
                          </h3>
                        </div>
                        <div className="w-full max-w-[300px] bg-white rounded-full ">
                          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center mb-1 p-1.5 leading-none rounded-full">
                            {" "}
                            45%
                          </div>
                          /
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <h1 className="text-black">
                            Lingusistic Analysis (Social Engineering)
                          </h1>
                        </div>
                        <div className="w-full max-w-[300px] bg-white rounded-full ">
                          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center mb-1 p-1.5 leading-none rounded-full">
                            {" "}
                            45%
                          </div>
                          /
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <h1 className="text-black">
                            Overall (Deepfake Social Engineering attack)
                          </h1>
                        </div>
                        <div className="w-full max-w-[300px] bg-white rounded-full ">
                          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center mb-1 p-1.5 leading-none rounded-full">
                            {" "}
                            45%
                          </div>
                          /
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-12">
                  <p className="text-2xl pb-3 flex items-center">Details</p>
                  <div className="bg-white overflow-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                            File Name
                          </th>
                          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                            Last Modified
                          </th>
                          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                            Size
                          </th>
                          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                            type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr>
                          <td className="w-1/3 text-left py-3 px-4">
                            {file?.name}
                          </td>
                          <td className="w-1/3 text-left py-3 px-4">
                            {file?.lastModified}
                          </td>
                          <td className="text-left py-3 px-4">{file?.size}</td>
                          <td className="text-left py-3 px-4">{file?.type}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </div>
        )}
        {state !== "sent" && (
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
                Detect Deepfake Audio
              </h2>
            </div>
            <div className="flex items-center justify-center w-full mt-10 mb-10">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    MP4, MP3, AVI, MPEG, FLV, OGG, MOV, (MAX 200MB )
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".mp3,.mp4,.wav"
                  onChange={handleOnChange}
                />
              </label>
            </div>
            <div className="drop-down-menu">
              <button
                type="submit"
                className="flex rounded-md bg-indigo-500 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleOnSubmit}
              >
                Analyze
              </button>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
