import { execSync } from 'child_process';
import commandExists from 'command-exists-promise';
import path from 'path';



async function checkDart(){
    return await commandExists('sass');
}

class KoaSass{
    constructor(config){
        if (config) {
            Object.assign(this, config)
        }
        this.loadPath = this.loadPath || "node_modules"
        // TODO: Check for dart-sass fallback to node-sass
        checkDart().then(exists=> {
            if(!exists){
                console.error("Dart not found!!!!");
                process.exit();
            }
        })
    }

    onRequest(ctx, next){
        if(ctx.path.endsWith('.scss')){
            // TODO render as scss
            console.log("The file is scss");
            console.log(` the context is ${JSON.stringify(ctx.originalUrl)}`)
            // TODO: rootPath?
            ctx.body = this.render(ctx.originalUrl);
        } else if (ctx.path.endsWith('.sass')){
            // TODO: render as sass
            console.log("This file is sass");
            ctx.body = this.render(ctx.path);
        } else{
            console.log("Not a Sass File type so moving on");
            next();
        }
    }

    render(location){
        if(!location.endsWith('.scss')) return null;
        if(this.prefix) location += `/${this.prefix}`
        if(!this.absolute){
            location = `.${location}`;
        }
        console.log(`The path for the sass file is ${location}`);
        const a = execSync(`sass ${location} --load-path=${this.loadPath}`);
        // TODO: Handle all encodings
        // TODO: Add source Map
        return a.toString('utf8');
    }

    get koaMiddleware(){
        return this.onRequest.bind(this);
    }
}

export { KoaSass }