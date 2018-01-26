import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GmapService } from './gmap.service';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GmapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
