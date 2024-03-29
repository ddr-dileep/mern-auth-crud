import { useEffect } from "react";

export const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Default Title";
    };
  }, [title]);

  return null;
};
