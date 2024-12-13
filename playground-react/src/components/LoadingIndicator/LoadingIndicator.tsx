import React from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const LoadingIndicator = () => {
  return (
    <Box sx={{display: 'grid', gap: 1, gridTemplateColumns: `repeat(2, 1fr)`}}>
      {Array.from({length: 10}).map((_, index) => (
        <Skeleton key={index} variant="rectangular" animation="wave" height={100} sx={{borderRadius: 3}} />
      ))}
    </Box>
  );
};

export default LoadingIndicator;
