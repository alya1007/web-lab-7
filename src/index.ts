import Koa from "koa";
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import connectDB from "./config/db.js";
import swaggerSpec from "./swagger.js";
import router from "./routes/movieRoutes.js";
// import swaggerUi from "swagger-ui-koa";

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser());
// app.use(swaggerUi.serve);
// app.use(swaggerUi.setup(swaggerSpec));

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
