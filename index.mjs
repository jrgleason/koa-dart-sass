import { execSync } from 'child_process';
import commandExists from 'command-exists-promise';

async function checkDart(){
    return await commandExists('dart');
}

class KoaSass{
    constructor(config){
        if (config) {
            Object.assign(this, config)
        }
        this.loadPath = this.loadPath || "node_modules"
        // TODO: Check for dart-sass fallback to node-sass
        checkDart().then(exists=> exists ? null : throw new Error("Dart not found!!!!"))
    }

    onRequest(ctx, next){
        if(ctx.path.endsWith('.scss')){
            // TODO render as scss
            console.log("The file is scss");
            // TODO: rootPath?
            ctx.body = this.render(ctx.path);
        } else if (ctx.path.endsWith('.sass')){
            // TODO: render as sass
            console.log("This file is sass");
            ctx.body = this.render(ctx.path);
        } else{
            console.log("Not a Sass File type so moving on");
            next();
        }
    }

    render(path){
        if(!id.endsWith('.scss')) return null;
        const a = execSync(`sass ${path} --load-path=${this.loadPath}`);
        // TODO: Handle all encodings
        // TODO: Add source Map
        return {
            code: `export default \`${a.toString('utf8')}\``
        }
    }

    get koaMiddleware(){
        return this.onRequest.bind(this);
    }
}

export { KoaSass }