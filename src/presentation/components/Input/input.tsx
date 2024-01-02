/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const getStatus = (): string => {
    return error ? '🔴' : '🟢';
  };

  const getTitle = (): string => {
    return error || 'OK';
  };

  return (
    <div className="flex  relative items-center mt-[16px] ">
      <input {...props} data-testid={props.name} onChange={handleChange} />
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
