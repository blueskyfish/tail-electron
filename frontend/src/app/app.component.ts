import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'elan-container',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Tail Electron';

  constructor() {}

  ngOnInit() {
    console.log('>> Initialize');
  }

  ngOnDestroy() {
    console.log('>> Destroy');
  }
}
