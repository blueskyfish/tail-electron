import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule, ElectronService } from 'ngx-electron';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private electronService: ElectronService) {}

  startup(): void {
    this.electronService.ipcRenderer.send('elan.frontend.ready', 'Elan Frontend is ready');
  }
}
