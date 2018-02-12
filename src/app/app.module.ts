import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GmapService } from './gmap.service';
import { OlmapService } from './olmap.service';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { OlMapComponent } from './ol-map/ol-map.component';
import { GMapComponent } from './g-map/g-map.component';


@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    GMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [GmapService, OlmapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
