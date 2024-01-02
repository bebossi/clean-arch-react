/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Context from '@/presentation/components/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];
  const getStatus = (): string => {
    return '🔴';
  };
  const getTitle = (): string => {
    return error;
  };
  return (
    <div className="flex  relative items-center mt-[16px] ">
      <input {...props} />
      {/* <span>🟢</span> */}

      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className="absolute right-8 text-xs cursor-help"
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
