import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import colors from "colors";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

//connect to database
connectDB();

//enable cors
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  //console.log(`Server listening on port ${port}`);
});
