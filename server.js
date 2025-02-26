const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8081;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}. Database connection successful`
      );
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
