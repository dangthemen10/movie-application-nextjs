import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>

      <div className="relative pl-4 pb-24 lg:space-y-24 text-white min-h-screen flex items-center">
        <div className="container mx-auto p-4 flex flex-wrap items-center">
          <div className="w-full md:w-5/12 text-center p-4">
            <Image
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
              alt="Not Found"
              width={500}
              height={100}
            />
          </div>
          <div className="w-full md:w-7/12 text-center md:text-left p-4">
            <div className="text-6xl font-medium">404</div>
            <div className="text-xl md:text-3xl font-medium mb-4">
              Oops. This page has gone missing.
            </div>
            <div className="text-lg mb-8">
              You may have mistyped the address or the page may have moved.
            </div>
            <Link href="/" className="border border-white rounded p-4">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
