import React from "react";

const LoadingIndicator = () => {
  return (
    <ul>
      {Array.from({length: 5}).map(_ => (
        <li key={Math.random()}>
          <div className="animate-pulse bg-gray-200 h-20 w-full mb-2 rounded-md" />
        </li>
      ))}
    </ul>
  );
};

export default LoadingIndicator;
