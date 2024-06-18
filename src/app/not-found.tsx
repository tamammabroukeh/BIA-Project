"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-lime-700 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center  md:text-3xl">
              <span className="text-lime-700">Oops!</span>{" "}
              <span>Page not found</span>
            </p>
            <p className="mb-8 text-center md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              href={"/"}
              className="px-4 py-2 border border-accent/30 bg-lime-900 border-solid hover:shadow-glass-sm rounded mr-2 font-meduim"
              onClick={() => router.refresh()}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
