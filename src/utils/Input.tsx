import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { motion } from "framer-motion";

type TFormInput<TFieldValue extends FieldValues> = {
  type?: string;
  id?: string;
  className: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  placeholder: string;
  errors: {
    required: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
};
const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};
const Input = <TFieldValue extends FieldValues>({
  type = "text",
  name,
  id,
  register,
  placeholder,
  errors,
  className,
}: TFormInput<TFieldValue>) => {
  return (
    <motion.input
      variants={item}
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(name, errors)}
      className={`${className} w-full rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg`}
    />
  );
};
export default Input;
