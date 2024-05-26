import { Context } from "koa";
import jwt from "jsonwebtoken";

export const generateToken = (ctx: Context) => {
	const { username, permissions } = ctx.request.body as {
		username: string;
		permissions: string;
	};
	const token = jwt.sign({ username, permissions }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
	ctx.body = { token };
};
