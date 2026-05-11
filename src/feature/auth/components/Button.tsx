interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ className, children, ...props }: Props) => {
  return (
    <button
      className={`${className}  active:scale-95 transition-all duration-200 ease-in-out cursor-pointer py-2 rounded-sm`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
