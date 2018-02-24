import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoadService } from '../script-load.service';

const url = 'https://openlayers.org/en/v4.6.4/build/ol.js';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css', './ol.css']
})

export class OlMapComponent implements AfterViewInit  {

  @ViewChild('olmapElement') olmapElement: ElementRef;

  private map: any;
  private point: any;
  private line: any;
  private stamen: any;
  private snapit: any;
  private osm: any;
  private view: any;

  constructor(private load: ScriptLoadService) {
  }

  rotate(w) {
    console.log(w);
    if (w === 'ccw') {
      this.view.animate({
        rotation: this.view.getRotation() - Math.PI / 2
      });
    } else {
      this.view.animate({
        rotation: this.view.getRotation() + Math.PI / 2
      });
    }
  }

  snap(type) {
    if (type) {
      this.map.addInteraction(this.snapit);
    } else {
      this.map.removeInteraction(this.snapit);
    }
  }

  addAgain(type) {
    if (type === 'stop') {
      this.map.removeInteraction(this.point);
      this.map.removeInteraction(this.line);
    } else {
      if (type === 'point') {
        this.map.addInteraction(this.point);
      }
      if (type === 'line') {
        this.map.addInteraction(this.line);
      }
    }
  }

  setTiles(tiles) {
    if (tiles === 'stamen') {
      this.map.setLayerGroup(this.stamen);
    } else {
      this.map.setLayerGroup(this.osm);

    }
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

    this.load.loadScript(url, 'omap', () => {

      const ol = window['ol'];

      this.osm = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      this.stamen = new ol.layer.Tile({
        source: new ol.source.Stamen({
          layer: 'toner'
        })
      });

      const source = new ol.source.Vector({wrapX: false});

      const vector = new ol.layer.Vector({
        source: source
      });

      this.view =  new ol.View({
        center: ol.proj.fromLonLat([23.82, 37.41]),
        zoom: 6
      });

      this.map = new ol.Map({
        target: 'olmap',
        layers: [this.osm, vector],
        view: this.view
      });

      this.point = new ol.interaction.Draw({
            source: source,
            type: 'Point'
      });
      this.line = new ol.interaction.Draw({
        source: source,
        type: 'LineString'
      });
      this.map.addInteraction(this.point);

      this.snapit = new ol.interaction.Snap({
        source: vector.getSource(),
        pixelTolerance: 30
      });
      this.map.addInteraction(this.snapit);
    });
  }
}
