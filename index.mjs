import {execSync} from 'child_process';
import commandExists from 'command-exists-promise';

async function checkDart() {
  return await commandExists('sass');
}

class KoaSass {
  constructor(config) {
    if (config) {
      Object.assign(this, config);
    }
    this.encoding = this.encoding || 'utf-8';
    // TODO: Check for dart-sass fallback to node-sass
    checkDart().then((exists)=> {
      if (!exists) {
        console.error('Dart not found!!!!');
        process.exit();
      }
    });
  }

  onRequest(ctx, next) {
    if (
      ctx.path.endsWith('.scss') ||
        ctx.path.endsWith('.sass') ||
        ctx.path.endsWith('.css')
    ) {
      console.log('Processing with Dart Sass');
      ctx.body = this.render(ctx.originalUrl);
    } else {
      console.log('Not a Sass File type so moving on');
      next();
    }
  }

  render(location) {
    if (
      !location.endsWith('.scss') &&
        !location.endsWith('.sass') &&
        !location.endsWith('.css')
    ) return null;
    if (this.prefix) location = `/${this.prefix}${location}`;
    if (!this.absolute) {
      location = `${process.cwd()}${location}`;
    }
    let command = `sass ${location}`;
    if (this.output) {
      command += ` ${this.output}`;
    }
    if (this.loadPaths) {
      this.loadPaths.forEach((path) => command += ` --load-path=${path}`);
    }
    console.log(`Running ${command}`);
    const a = execSync(command);
    // TODO: Handle all encodings
    // TODO: Add source Map
    return a.toString(this.encoding);
  }

  get koaMiddleware() {
    return this.onRequest.bind(this);
  }
}

export {KoaSass};
