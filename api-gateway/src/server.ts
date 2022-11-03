import { Application, Context } from 'oak/mod.ts';

const app = new Application();

app.use((ctx: Context, next) => {
	console.log(`1: ${new Date()}`);
	next();
});
app.use((ctx: Context, next) => {
	console.log(`2: ${new Date()}`);
	ctx.response.body = {
		data: 'Hello World!',
	};
	next();
});

await app.listen({ port: 8000 });
