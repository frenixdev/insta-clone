const ErrorText = ({ text }: { text: string }) => {
  return <div className="w-full h-full px-2 text-red-500 text-sm">{text}</div>;
};

export default ErrorText;
