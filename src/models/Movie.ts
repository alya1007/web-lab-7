import { Schema, model } from "mongoose";

const entitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Movie = model("Movie", entitySchema);

export default Movie;
