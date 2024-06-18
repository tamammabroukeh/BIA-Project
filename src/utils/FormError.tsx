const FormError = ({ message }: { message: string }) => {
  return <span className="inline-block self-start text-accent">{message}</span>;
};

export default FormError;
