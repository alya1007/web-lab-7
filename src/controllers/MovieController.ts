import { Context } from "koa";
import Movie from "../models/Movie.js";

export const getMovies = async (ctx: Context) => {
	const { page = 1, limit = 10 } = ctx.query;
	const skip = (Number(page) - 1) * Number(limit);

	try {
		const movies = await Movie.find().skip(skip).limit(Number(limit));
		ctx.status = 200;
		ctx.body = movies;
	} catch (err: any) {
		ctx.status = 500;
		ctx.body = { message: err.message };
	}
};

export const getMovie = async (ctx: Context) => {
	const { id } = ctx.params;

	try {
		const movie = await Movie.findById(id).populate("reviews").exec();

		if (movie) {
			ctx.status = 200;
			ctx.body = movie;
		} else {
			ctx.status = 404;
			ctx.body = { message: "Movie not found" };
		}
	} catch (err: any) {
		ctx.status = 500;
		ctx.body = { message: err.message };
	}
};

export const createMovie = async (ctx: Context) => {
	const { title, year, genre, actors } = ctx.request.body as {
		title: string;
		year: number;
		genre: string;
		actors: string[];
	};

	try {
		const movie = new Movie({ title, year, genre, actors });
		await movie.save();
		ctx.status = 201;
		ctx.body = movie;
	} catch (err: any) {
		ctx.status = 500;
		ctx.body = { message: err.message };
	}
};

export const updateMovie = async (ctx: Context) => {
	const { id } = ctx.params;
	const { title, year, genre, actors } = ctx.request.body as {
		title: string;
		year: number;
		genre: string;
		actors: string[];
	};

	try {
		const movie = await Movie.findByIdAndUpdate(
			id,
			{ title, year, genre, actors },
			{ new: true }
		);

		if (movie) {
			ctx.status = 200;
			ctx.body = movie;
		} else {
			ctx.status = 404;
			ctx.body = { message: "Movie not found" };
		}
	} catch (err: any) {
		ctx.status = 500;
		ctx.body = { message: err.message };
	}
};

export const deleteMovie = async (ctx: Context) => {
	const { id } = ctx.params;

	try {
		const movie = await Movie.findByIdAndDelete(id);

		if (movie) {
			ctx.status = 204;
		} else {
			ctx.status = 404;
			ctx.body = { message: "Movie not found" };
		}
	} catch (err: any) {
		ctx.status = 500;
		ctx.body = { message: err.message };
	}
};
