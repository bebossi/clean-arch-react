import React from 'react';
import Spinner from '../Spinner/spinner';

const FormStatus: React.FC = () => {
  return (
    <div className="flex flex-col items-center ">
      <Spinner />
      <span className="mt-[30px] text-rose-500">Error</span>
    </div>
  );
};

export default FormStatus;
