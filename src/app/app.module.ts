import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScriptLoadService } from './script-load.service';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { OlMapComponent } from './ol-map/ol-map.component';
import { GMapComponent } from './g-map/g-map.component';
import { DrawComponent } from './draw/draw.component';


@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    GMapComponent,
    DrawComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ScriptLoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
