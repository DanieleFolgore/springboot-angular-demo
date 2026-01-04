import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent  // IMPORT per componente standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
