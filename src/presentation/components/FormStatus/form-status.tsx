import React, { useContext } from 'react';
import Spinner from '../Spinner/spinner';
import Context from '@/presentation/components/contexts/form/form-context';

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context);
  return (
    <div data-testid="error-wrap" className="flex flex-col items-center ">
      {state.isLoading && <Spinner />}
      {errorState.main && (
        <span className="mt-[30px] text-rose-500">{errorState.main}</span>
      )}
    </div>
  );
};

export default FormStatus;
