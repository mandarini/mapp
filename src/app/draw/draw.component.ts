import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoadService } from '../script-load.service';
import { HttpClient } from '@angular/common/http';
import { mapNumber } from '../../assets/functions/mapNumber';
import { styledMap } from '../../assets/mapStylingMaterial/styledMap';
import { customGradient } from '../../assets/mapStylingMaterial/gradient';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + your_API_key + '&libraries=drawing';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit  {


  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  private map: any;
  private maps: any;
  private drawingManager: any;
  private coords: any;

  constructor(private load: ScriptLoadService) {
  }

  draw(type) {
    switch (type) {
      case 'marker':
        this.drawingManager.setDrawingMode(this.maps.drawing.OverlayType.MARKER);
        let point = new this.maps.MarkerImage('assets/point.png',
          null,
          null,
          null,
          new this.maps.Size(30, 30)
        );
        this.drawingManager.setOptions({
          markerOptions: {
            icon: point,
            clickable: true,
            draggable: true
          }
        });
        break;
      case 'cat':
        this.drawingManager.setDrawingMode(this.maps.drawing.OverlayType.MARKER);
        let cat = new this.maps.MarkerImage('assets/cat.png',
          null,
          null,
          null,
          new this.maps.Size(50, 50)
        );
        this.drawingManager.setOptions({
          markerOptions: {
            icon: cat,
            clickable: true,
            draggable: true
          }
        });
        break;
      case 'polygon':
        this.drawingManager.setDrawingMode(this.maps.drawing.OverlayType.POLYGON);
        this.drawingManager.setOptions({
          polygonOptions: {
            fillColor: '#000000',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#000000',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'square':
        this.drawingManager.setDrawingMode(this.maps.drawing.OverlayType.RECTANGLE);
        this.drawingManager.setOptions({
          polygonOptions: {
            fillColor: '#000000',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#000000',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'polyline':
        this.drawingManager.setDrawingMode(this.maps.drawing.OverlayType.POLYLINE);
        this.drawingManager.setOptions({
          polygonOptions: {
            fillColor: '#000000',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#000000',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'pan':
        this.drawingManager.setDrawingMode(null);
        break;
      default:
        this.drawingManager.setDrawingMode(null);
    }
  }

  ngAfterViewInit(): void {

    this.load.loadScript(url, 'gmap',() => {
      this.maps = window['google']['maps'];
      console.log(this.maps);
      const loc = new this.maps.LatLng(51.561638, -0.14);

      const darkmap = new this.maps.StyledMapType(styledMap, {name: 'Dark Map'});

      this.coords = function (x, y) {
        return new this.maps.LatLng(x, y);
      };

      this.map = new this.maps.Map(this.mapElm.nativeElement, {
        zoom: 11,
        center: loc,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: this.maps.ZoomControlStyle.LARGE,
          position: this.maps.ControlPosition.RIGHT_BOTTOM
        }
      });
      this.map.mapTypes.set('dark_map', darkmap);
      this.map.setMapTypeId('dark_map');
      const drawControl = document.getElementById('draw-buttons');
      this.map.controls[this.maps.ControlPosition.TOP_LEFT].push(drawControl);

      this.drawingManager = new this.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false, //i have my custom tools so i don't need the defaults to be displayed
        circleOptions: {
          fillColor: '#ffffff',
          fillOpacity: 0.7,
          strokeWeight: 2,
          clickable: true,
          editable: true,
          zIndex: 1
        },
        rectangleOptions: {
          strokeWeight: 1,
          clickable: true,
          editable: true,
          draggable: true
        }
      });
      this.drawingManager.setMap(this.map);
    });
  }
}
