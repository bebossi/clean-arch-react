import React, { useContext } from 'react';
import Spinner from '../Spinner/spinner';
import Context from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  return (
    <div data-testid="error-wrap" className="flex flex-col items-center ">
      {state.isLoading && <Spinner />}
      {state.mainError && (
        <span data-testid="main-error" className="mt-[30px] text-rose-500">
          {state.mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
