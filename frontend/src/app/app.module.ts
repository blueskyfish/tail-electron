import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule, ElectronService } from 'ngx-electron';

import { AppComponent } from './app.component';
import { AppChannels } from './app.channels';

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

  constructor(private electronService: ElectronService) {
    this.initialListeners();
  }

  /**
   * The startup call when the angular is ready
   */
  startup(): void {
    this.electronService.ipcRenderer.send(AppChannels.CHANNEL_FRONTEND_READY, 'Elan Frontend is ready');
  }

  private initialListeners(): void {
    this.electronService.ipcRenderer.on(AppChannels.CHANNEL_BACKEND_SETTING, (ev, ...args: any[]) => {
      console.log('>>> Frontend Settings', args);
    });
  }
}
