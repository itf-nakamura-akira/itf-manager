import { Application, Context } from 'oak/mod.ts';

const app = new Application();

app.use((ctx: Context) => {
	ctx.response.body = 'Hello World!!!';
});

await app.listen({ port: 8000 });
