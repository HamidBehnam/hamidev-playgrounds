import React from "react";

const LoadingIndicator = () => {
  return (
    <ul>
      {Array.from({length: 10}).map(_ => (
        <li>Animated placeholder</li>
      ))}
    </ul>
  );
};

export default LoadingIndicator;
