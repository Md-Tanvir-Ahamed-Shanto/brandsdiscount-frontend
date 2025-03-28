import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const RoundedBtn: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-first-500 text-white px-5 py-2.5 rounded-[6px] font-medium transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default RoundedBtn;
