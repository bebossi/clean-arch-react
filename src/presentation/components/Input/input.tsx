import React from 'react';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex  relative items-center mt-[16px] ">
      <input {...props} />
      {/* <span>🟢</span> */}

      <span className="absolute right-8 text-xs cursor-help">🔴</span>
    </div>
  );
};

export default Input;
