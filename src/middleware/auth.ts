import { Context, Next } from "koa";
import jwt from "jsonwebtoken";

const authenticateJWT = async (ctx: Context, next: Next) => {
	const token = ctx.headers.authorization?.split(" ")[1];

	if (token) {
		try {
			const user = jwt.verify(token, process.env.JWT_SECRET!);
			ctx.state.user = user;
			await next();
		} catch (err) {
			ctx.status = 403;
		}
	} else {
		ctx.status = 401;
	}
};

export default authenticateJWT;
