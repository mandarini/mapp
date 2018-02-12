import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {OlmapService} from '../olmap.service';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})


export class OlMapComponent implements AfterViewInit  {

  @ViewChild('olmapElement') olmapElement: ElementRef;

  private map: any;

  constructor(private olapi: OlmapService) {
  }

  ngAfterViewInit(): void {

    /**
     * Init map api [ol]
     */
    this.olapi.loadScript(() => {
      console.log('loaded');
      this.map = new ol.Map({
        target: 'olmap',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      });
    };
  }

}
