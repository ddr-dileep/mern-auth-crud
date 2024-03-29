import "./styles.scss";

export const AppLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="orbit" style={{ "--index": 0 }}></div>
        <div className="orbit" style={{ "--index": 1 }}></div>
        <div className="orbit" style={{ "--index": 2 }}></div>
        <div className="orbit" style={{ "--index": 3 }}></div>
        <div className="orbit" style={{ "--index": 4 }}></div>
      </div>
    </div>
  );
};
