"use client";

import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ErrorContextType {
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

const useError = () => useContext(ErrorContext);

const ErrorProvider = ({ children }: { children: ReactElement }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (errorMessage) setErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { useError };
export default ErrorProvider;
