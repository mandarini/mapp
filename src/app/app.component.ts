import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GmapService } from './gmap.service';
import { HttpClient } from '@angular/common/http';
import { csvToArray } from '../assets/customs/csvToArray';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;

  private map: any;
  results: string[];

  constructor(private gapi: GmapService, private http: HttpClient) {
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
       // console.log(event.feature.getProperty('PREVALENCE'));
      });
      this.map.data.setStyle(function(feature) {
        const lon = feature.getProperty('PREVALENCE');
        const value = 255 - Math.round((lon) * (255) / 5);
        const color = 'rgb(' + value + ',' + value + ',' + 0 + ')';
        // console.log(color);
        return {
          fillColor: color,
          strokeWeight: 1
        };
      });

      // this.http.get('assets/letting.json', {responseType: 'text'}).subscribe(data => {
      this.http.get('assets/letting.json').subscribe(data => {
        this.results = data['data'];
        console.log(this.results[0]);
        console.log(this.results[0][15]); // total bidders
        console.log(this.results[0][16]); // successful bid points
        console.log(this.results[0][23]); // longitude
        console.log(this.results[0][24]); // latitude
        // csvToArray(data);
      });
    });
  }

}
