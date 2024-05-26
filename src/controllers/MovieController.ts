import { Request, Response } from "express";
import Movie from "../models/Movie.js";

export const getMovies = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const movies = await Movie.find().skip(skip).limit(Number(limit));
    res.status(200).json(movies);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const movie = new Movie(req.body);

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedMovie);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
