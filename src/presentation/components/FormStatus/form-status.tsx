import React, { useContext } from 'react';
import Spinner from '../Spinner/spinner';
import Context from '@/presentation/components/contexts/form/form-context';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);
  return (
    <div data-testid="error-wrap" className="flex flex-col items-center ">
      {isLoading && <Spinner />}
      {errorMessage && (
        <span className="mt-[30px] text-rose-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormStatus;
