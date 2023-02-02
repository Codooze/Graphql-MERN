import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import colors from "colors";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  console.log(`Loading environment variables from .env file`.yellow.bold);
}

if (!process.env.PORT) {
  console.error(`Environment variable PORT not found`.red.bold);
  process.exit(1);
}

const port = process.env.PORT;
console.log(`Server running in ${process.env.NODE_ENV} mode`.yellow.bold);

const app = express();

//connect to database
connectDB();

//enable cors
app.use(cors()); //Allow all origins to access the endpoint

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
