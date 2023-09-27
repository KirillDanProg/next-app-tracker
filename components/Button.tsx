import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined
  trigger: React.ReactNode;
  handler: () => void;
  className: string;
};

const Button = ({ handler, trigger, className, type }: ButtonProps) => {
  const buttonType = type || "button"
  return (
    <button type={buttonType} onClick={handler} className={className}>
      {trigger}
    </button>
  );
};

export default Button;
