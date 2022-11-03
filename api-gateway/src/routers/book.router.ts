import { getQuery } from 'oak/helpers.ts';
import { Context } from 'oak/mod.ts';

const books = new Map<string, {
	id: string;
	title: string;
	author: string;
}>();

books.set('1', {
	id: '1',
	title: 'The Hound of the Baskervilles',
	author: 'Conan Doyle, Arthur',
});
books.set('2', {
	id: '2',
	title: 'The Hound of the Gasdaw',
	author: 'David Doyle, Arthur',
});

export async function hello(ctx: Context) {
	ctx.response.body = 'Hello world!';
}

export async function book(ctx: Context) {
	ctx.response.body = Array.from(books.values());
}

export async function bookById(ctx: Context) {
	const params: { id?: string } = getQuery(ctx, { mergeParams: true });

	if (books.has(params.id || '')) {
		ctx.response.body = books.get(params.id!);
	}
}
