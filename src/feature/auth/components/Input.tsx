import type React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  err?: string;
}
const Input = ({ err, label, id, className, ...props }: Props) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        autoComplete="off"
        className={`${className} w-full border border-zinc-800 focus:border-zinc-600 p-2 rounded-md focus:outline-none placeholder:text-sm`}
        {...props}
      />
      {err ? <p className="text-red-500 text-sm">{err}</p> : null}
    </>
  );
};

export default Input;
