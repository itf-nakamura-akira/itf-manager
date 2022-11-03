import { Application, Context, Router } from 'oak/mod.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import { book, bookById, hello } from './routers/book.router.ts';

const app = new Application();

// Middleware
app.use(errorHandler);
app.use(async (_: Context, next) => {
	console.log(`1: ${new Date()}`);
	await next();
	console.log(`5: ${new Date()}`);
});
app.use(async (ctx: Context, next) => {
	console.log(`2: ${new Date()}`);
	ctx.response.body = {
		data: 'Hello World!',
	};

	await next();

	console.log(`4: ${new Date()}`);
});

// Routers
const router = new Router()
	.get('/', hello)
	.get('/book', book)
	.get('/book/:id', bookById);
app.use(router.routes());
app.use(router.allowedMethods());

// Server
app.addEventListener('listen', ({ hostname, port, secure }) => {
	console.log(`Listening on: ${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`);
});

await app.listen({ port: 8000 });
