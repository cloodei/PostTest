import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const withFakeLoading = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }, []);
    if (isLoading) {
      return (
        <h1 className='text-center my-auto'>
          Hang On...
          <CircularProgress style={{ color: '#3f51b5', marginLeft: '12px' }} />
        </h1>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withFakeLoading;