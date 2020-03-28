# koa-dart-sass
Koa Sass Middleware using Dart Sass instead of Node-Sass

# Example

The basic example is...

1. Install dependencies

       npm install --save koa-mount koa koa-static @jrg/koa-sass

3. Make the style directory

       mkdir styles

3. Create a simple SCSS `vi ./styles/test.scss` and add the following...

       .test{
         height: 100%
       }       

2. Create the following class in a server**.mjs**

       import mount from 'koa-mount';
       import Koa from 'koa';
       import serve from 'koa-static';
       import {KoaSass} from '@jrg/koa-sass';
    
       const app = new Koa();
       const main = new Main();
       const stylesApp = new Koa();
       const sass = new KoaSass();
    
       stylesApp.use(sass.koaMiddleware);
       stylesApp.use(serve('styles'));
    
       app.use(mount('/styles', stylesApp))
       app.listen(3000);
       
3. Run the application using `node --experimental-modules server.mjs` 
4. Visit [http://locahost:3000/styles/test.scss](http://locahost:3000/styles/test.scss). It should be rendered like a normal css file and can be used like...

       link(rel="stylesheet" type="text/css" href="/styles/test.scss")     

# Issues

1. Still working on an implementation to allow sass files
1. Add ability to fallback to node-sass
1. Add additional configuration params