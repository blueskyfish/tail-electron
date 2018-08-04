import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NgModuleRef } from '../node_modules/@angular/core/src/render3';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((modulRef: NgModuleRef<AppModule>) => {
    modulRef.instance.startup();
  })
  .catch(err => console.log(err));
