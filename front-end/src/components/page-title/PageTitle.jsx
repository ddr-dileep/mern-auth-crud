import { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Default Title";
    };
  }, [title]);

  return null;
};

export default PageTitle;
