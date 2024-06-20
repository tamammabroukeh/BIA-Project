"use client";
import Loading from "@/assets/icons/loading-spinner.svg";
import Image from "next/image";
const loading = () => {
  return (
    <div className="absolute left-[22%] top-[20%] md:top-[30%] md:left-[40%]">
      <Image src={Loading} alt="Loading..." priority />
    </div>
  );
};
export default loading;