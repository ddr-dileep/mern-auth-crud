import app from "./src/app.js";
const port = process.env.APP_PORT || 8081;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
