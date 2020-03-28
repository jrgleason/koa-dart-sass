import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import { KoaSass } from '@jrg/koa-sass';
import Pug from 'koa-pug';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const viewPath = path.resolve(__dirname, './views');

console.log(`The viewPath is ${viewPath}`);

const pug = new Pug({
  viewPath
});

const app = new Koa();
const sass = new KoaSass();
const sassApp = new Koa();
sassApp.use(sass.koaMiddleware);
sassApp.use(serve('sass'));
app.use(mount('/sass', sassApp));
app.use(async ctx => {
    ctx.body = await pug.render('index', { }, true);
});

app.listen(3000);