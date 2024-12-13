import React, { FC } from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>Error: {message || "Something went wrong, try again later!"}</div>
  );
};

export default ErrorMessage;
