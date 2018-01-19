import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GmapService } from './gmap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;

  private map: any;

  constructor(private gapi: GmapService) {
  }

  ngAfterViewInit(): void {

    /**
     * Init map api [google.maps]
     */
    this.gapi.loadScript(() => {
      const maps = window['google']['maps'];
      console.log(maps);
      const loc = new maps.LatLng(53.52476717517185, -2.5434842249308414);

      this.map = new maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: loc,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: maps.ZoomControlStyle.LARGE,
          position: maps.ControlPosition.RIGHT_BOTTOM
        }
      });
      this.map.data.loadGeoJson('assets/lonely.geojson');
      this.map.data.addListener('mouseover', function(event) {
       console.log(event.feature.getProperty('NUMBER_LONELY'));
      });
      this.map.data.setStyle(function(feature) {
        const lon = feature.getProperty('NUMBER_LONELY');
        const value = Math.round(255 * (lon / 10));
        const color = 'rgb(' + value + ',0,' + value + ')';
        console.log(color);
        return {
          fillColor: color,
          strokeWeight: 1
        };
      });
    });
  }

}
