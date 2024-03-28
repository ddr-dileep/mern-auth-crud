export const isAuthenticated = () => {
  const token = localStorage.getItem("auth");
  return token?.length > 0 && token && token !== undefined && token !== null;
};

export const removeAuthenticated = () => {
  localStorage.removeItem("auth");
};