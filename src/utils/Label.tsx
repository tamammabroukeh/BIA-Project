import { motion } from "framer-motion";
const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};
const Label = ({
  htmlFor,
  title,
  classes,
}: {
  title: string;
  htmlFor: string;
  classes: string;
}) => {
  return (
    <motion.label className={`${classes}`} variants={item} htmlFor={htmlFor}>
      {title}
    </motion.label>
  );
};

export default Label;
