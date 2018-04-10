import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OlMapComponent } from './ol-map/ol-map.component';
import {GMapComponent} from './g-map/g-map.component';
import {DrawComponent} from './draw/draw.component';

const routes: Routes = [
  { path: '', redirectTo: 'gmap', pathMatch: 'full' },
  { path: 'ol', component: OlMapComponent },
  { path: 'gmap', component: GMapComponent },
  { path: 'draw', component: DrawComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
