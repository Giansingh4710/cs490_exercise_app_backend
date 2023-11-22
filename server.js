const app = require("./app.js");
const port = process.env.PORT || 1313;

app.listen(port, () => {
  const link = `http://127.0.0.1:${port}`;
  console.log(`Server is running on port ${port}`);
  console.log(`Visit ${link} to see the app!`);
});
