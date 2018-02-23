import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {OlmapService} from '../olmap.service';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css', './ol.css']
})


export class OlMapComponent implements AfterViewInit  {

  @ViewChild('olmapElement') olmapElement: ElementRef;

  private map: any;
  private draw: any;

  constructor(private olapi: OlmapService) {
  }

  nowhat() {
    this.map.removeInteraction(this.draw);
  }

  addAgain() {
    this.map.addInteraction(this.draw);
  }

  ngAfterViewInit(): void {

    /**
     * Init map api [ol]
     *
     * We can use the ol object while we are here only! :)
     *
     * Outside of here, we can use the map and anything else that is global,
     * thanks to angular
     *
     */

    this.olapi.loadScript(() => {

      const ol = window['ol'];

      const raster = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      const source = new ol.source.Vector({wrapX: false});

      const vector = new ol.layer.Vector({
        source: source
      });

      this.map = new ol.Map({
        target: 'olmap',
        layers: [raster, vector],
        view: new ol.View({
          center: ol.proj.fromLonLat([23.82, 37.41]),
          zoom: 6
        })
      });

      this.draw = new ol.interaction.Draw({
            source: source,
            type: 'Point'
      });
      this.map.addInteraction(this.draw);

    });
  }
}