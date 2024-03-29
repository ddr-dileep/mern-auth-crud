import "./heading.scss";

export const AppHeading = ({ title, subtitle, className }) => {
  return (
    <>
      <h2 className={`${className} app-heading`}>{title}</h2>
      {subtitle && <span className="app-subtitle">{subtitle}</span>}
    </>
  );
};
