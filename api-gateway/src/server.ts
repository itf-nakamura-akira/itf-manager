import { Application, Context } from 'oak/mod.ts';
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = new Application();

app.use(errorHandler);
app.use(async (_: Context, next) => {
	console.log(`1: ${new Date()}`);
	await next();
});
app.use(async (ctx: Context, next) => {
	console.log(`2: ${new Date()}`);
	ctx.response.body = {
		data: 'Hello World!',
	};

	await next();
});

// サーバー起動時のイベント
app.addEventListener('listen', ({ hostname, port, secure }) => {
	console.log(`Listening on: ${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`);
});

await app.listen({ port: 8000 });
