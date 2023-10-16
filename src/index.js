require("dotenv").config();
const server = require("./server");
const port = process.env.DB_PORT || 3001;
console.log(process.env.PORT);
server.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
