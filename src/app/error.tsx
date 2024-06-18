"use client";
import { IError } from "@/interfaces/interfaces";
import Link from "next/link";
const Error = ({ error, reset }: IError) => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl mb-4">{error}, please try again.</h1>
      <Link
        href={"/"}
        className="px-5 py-3 text-lg border-accent/30 bg-lime-800 border-solid hover:shadow-glass-sm rounded-xl font-meduim"
        onClick={() => reset()}
      >
        Try Again
      </Link>
    </div>
  );
};

export default Error;
