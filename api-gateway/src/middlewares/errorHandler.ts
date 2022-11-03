import { Context, HttpError, isHttpError, Status } from 'oak/mod.ts';

/**
 * 全体の例外ハンドラー
 * 例外を投げる側の例：
 *  throw createHttpError(Status.Unauthorized, '認証処理に失敗しました。アカウントかパスワードを確認してください。');
 *
 * @param ctx コンテキスト
 * @param next 次のミドルウェア処理
 */
export async function errorHandler(ctx: Context, next: () => Promise<unknown>) {
	try {
		await next();
	} catch (err) {
		if (isHttpError(err)) {
			const error: HttpError = err;

			ctx.response.status = error.status;

			switch (error.status) {
				case Status.NotFound:
					ctx.response.body = 'リクエストされたデータが見つかりませんでした。';

					break;

				default:
					ctx.response.body = error.message;

					break;
			}
		} else {
			ctx.response.status = Status.InternalServerError;
			ctx.response.body = 'サーバーで障害が発生しました。時間が経っても解決しない場合は、管理者にお問い合わせください。';
		}
	}
}
