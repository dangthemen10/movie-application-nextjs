'use client';

import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import Head from 'next/head';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Head>
        <title>Oops! Something went wrong</title>
      </Head>
      <div className="relative pl-4 pb-24 lg:space-y-24 text-white min-h-screen flex items-center">
        <div className="container mx-auto p-4 flex flex-wrap items-center">
          <div className="w-full md:w-5/12 text-center p-4">
            <MdSentimentVeryDissatisfied />
          </div>
          <div className="w-full md:w-7/12 text-center md:text-left p-4">
            <div className="text-6xl font-medium">Unsupports!</div>
            <div className="text-lg mb-8">Oops. {error.message}</div>
            <button onClick={() => reset()}>Try again</button>
          </div>
        </div>
      </div>
    </>
  );
}
