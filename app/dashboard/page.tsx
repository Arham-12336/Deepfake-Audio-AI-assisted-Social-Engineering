"use client";
import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";

import { Utils } from "@/utils/utils";

const utils = new Utils();

const Dashboard = () => {
  const [state, setState] = useState("ready");
  const [percentage, setPercentage] = useState<any>();
  const [dfResult, setDFResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [upload, setUploading] = useState<boolean>(false);
  const [file, setfile] = useState<File>();
  let ratingResult;
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (file === undefined) {
      alert("please select a file ");
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        let data = await res.json();
        console.log("data : ", data.result);
        setPercentage(data.analysis_result);
        setDFResult(data.deepfake_result);
      }
    } catch (e) {
      console.error(e);
    }
    setState("sent");
    setLoading(false);
  };
  const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setfile(target.files[0]);
    setUploading(true);
  };
  useEffect(() => {
    ratingResult = utils.alertChecker(dfResult, percentage);
  }, [dfResult, percentage]);

  console.log("rating result : ", ratingResult, percentage, dfResult);
  console.log(percentage);
  console.log(dfResult);
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
                          <p className="text-2xl text-black">
                            OverAll Risk Rating
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div>
                            <img src="/alert.svg" width={60} height={60} />
                          </div>
                          <div>
                            <p className="text-black">{ratingResult}</p>
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
                          <h3 className="text-black">Deep fake</h3>
                        </div>
                        <div className="w-full max-w-[300px] bg-white rounded-full ">
                          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center mb-1 p-1.5 leading-none rounded-full">
                            {dfResult}
                          </div>
                          /
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <h1 className="text-black">
                            Potential Social Engineering threat
                          </h1>
                        </div>
                        <div className="w-full max-w-[300px] bg-white rounded-full ">
                          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center mb-1 p-1.5 leading-none rounded-full">
                            {percentage}%
                          </div>
                          /
                        </div>
                      </div>
                      {/* <div className="flex flex-row justify-between">
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
                      </div> */}
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
              <h2 className="mt-10 text-center text-2xl items-center font-bold leading-9 tracking-tight text-gray-100">
                Detect Deepfake Audio
              </h2>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex items-center justify-center w-full max-w-[800px] mt-10 mb-10">
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
              <div className="flex items-center justify-center w-full max-w-[600px] mt-10 mb-10 dark:bg-gray-900 border-white border-dashed rounded-lg cursor-pointer ">
                <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <li className="mb-10 mt-0 ms-6">
                    <span
                      className={
                        upload === true
                          ? `absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`
                          : `absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700`
                      }
                    >
                      <svg
                        className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                    <h3 className="font-medium leading-tight text-white">
                      Upload your Audio File
                    </h3>
                    <p className="text-sm">Format: .mp3,.wav only</p>
                  </li>
                  <li className="mb-10 ms-6">
                    <span
                      className={
                        loading === true
                          ? `absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`
                          : `absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700`
                      }
                    >
                      <svg
                        className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <h3 className="font-medium leading-tight text-white">
                      Click the Analyze button
                    </h3>
                    <p className="text-sm">
                      Note: This may take a few minutes so dont refresh
                    </p>
                  </li>
                  <li className="mb-1 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                      <svg
                        className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <h3 className="font-medium leading-tight text-white">
                      See Result and Rating
                    </h3>
                    <p className="text-sm"> - Technical Analysis(Deep Fake)</p>
                    <p className="text-sm"> - Linguistic Analysis(Deep Fake)</p>
                    <p className="text-sm">
                      - Overall Analysis(DeepFake Social Engineering)
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="flex flex-row ">
              <div>
                {loading === false && (
                  <button
                    type="submit"
                    className="flex rounded-md bg-indigo-500 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleOnSubmit}
                  >
                    Analyse
                  </button>
                )}

                {loading === true && (
                  <button
                    disabled
                    type="button"
                    className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Analysing...
                  </button>
                )}
              </div>
              <div>
                {/* <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
