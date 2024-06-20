"use client";
import { motion } from "framer-motion";
import FormError from "@/utils/FormError";
import Input from "@/utils/Input";
import useTSPForm from "@/hooks/useTSPForm";
import Label from "@/utils/Label";
import DrawingComponent from "@/components/Draw";
// some style
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};
// for animation
const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};
export default function Form() {
  // hook for logic form
  const { errors, handleSubmit, onSubmit, register, response, loading } =
    useTSPForm();
  console.log(loading);
  return (
    <>
      <div
        className="border-[2px] rounded-md
    border-solid p-10 custom-bg"
      >
        {/* form  */}
        <motion.form
          variants={container}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col space-y-8"
        >
          {/* truck capacity */}
          <div className="space-y-2">
            <Label
              classes="mx-1 text-gray-400"
              htmlFor="capacities"
              title="Enter the Truck capacities as 10 15 20 ..."
            />
            {/* trucks input */}
            <Input
              errors={{
                required: `Truck capacity are required!`,
                minLength: {
                  value: 1,
                  message:
                    "Truck capacity should be at least 1 characters long.",
                },
              }}
              name="trucksCapacities"
              placeholder="Truck capacities"
              id="capacities"
              className="p-2"
              register={register}
              type="text"
            />
            {/* to show the error for trucks input */}
            {errors.trucksCapacities && (
              <FormError
                message={
                  errors.trucksCapacities.message
                    ? errors.trucksCapacities.message
                    : ""
                }
              />
            )}
          </div>
          {/* Packages information */}
          <div className="space-y-2">
            <Label
              classes="mx-1 text-gray-400"
              htmlFor="packagesInfo"
              title="Enter package values ​​and where each package will go as (5:A 7:B 10:C 8:D) : "
            />
            {/* packages input */}
            <Input
              errors={{
                required: `Packages information are required!`,
              }}
              className="p-2"
              name="packagesInfo"
              placeholder="Packages information"
              register={register}
              type="text"
            />
            {/* to show the error for packages input */}
            {errors.packagesInfo && (
              <FormError
                message={
                  errors.packagesInfo.message ? errors.packagesInfo.message : ""
                }
              />
            )}
          </div>
          {/* Distances between cities */}
          <div className="space-y-2">
            <Label
              classes="mx-1 text-gray-400"
              htmlFor="citiesDistances"
              title=" Enter the distances between cities as (AB:10 AC:15 AD:7 BC:20 BD:5 CD:8) : "
            />
            {/* citiesDistances input */}
            <Input
              className="p-2"
              errors={{
                required: `Distances between cities are required!`,
              }}
              name="citiesDistances"
              placeholder="Distances between cities"
              register={register}
              type="text"
            />
            {/* to show the error for cities distances input */}
            {errors.citiesDistances && (
              <FormError
                message={
                  errors.citiesDistances.message
                    ? errors.citiesDistances.message
                    : ""
                }
              />
            )}
          </div>
          {/* Start button */}
          <motion.input
            variants={item}
            value="Start"
            className="py-4 rounded-md text-xl shadow-lg bg-background border border-accent/30 border-solid
      hover:shadow-glass-sm backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize
      "
            type="submit"
          />
        </motion.form>
      </div>
      {/* to show the draw */}
      {response && <DrawingComponent data={response} />}
    </>
  );
}
