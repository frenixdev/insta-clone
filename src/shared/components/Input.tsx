import type React from "react";
import { MdError } from "react-icons/md";

interface Props extends React.ComponentProps<"input"> {
  label?: string;
  err?: string;
}

const Input = ({
  err,
  label,
  id,
  className = "",
  ...props
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-zinc-300 tracking-wide"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        autoComplete="off"
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-error` : undefined}
        className={`
          w-full
          border
          bg-zinc-950
          p-2.5
          rounded-md
          text-sm
          transition-all
          duration-200
          outline-none
          placeholder:text-zinc-500

          ${
            err
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
          }

          disabled:opacity-60
          disabled:cursor-not-allowed

          ${className}
        `}
        {...props}
      />

      {err && (
        <div
          id={`${id}-error`}
          className="flex items-center gap-1 text-red-400 text-sm mt-0.5 animate-in fade-in"
        >
          <MdError className="text-base shrink-0" />
          <p>{err}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
