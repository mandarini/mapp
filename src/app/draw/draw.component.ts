import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ScriptLoadService} from '../script-load.service';
import {HttpClient} from '@angular/common/http';
import {mapNumber} from '../../assets/functions/mapNumber';
import {styledMap} from '../../assets/mapStylingMaterial/styledMap';
import {customGradient} from '../../assets/mapStylingMaterial/gradient';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + your_API_key + '&libraries=drawing';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  private map: any;
  private maps: any;
  private drawingManager: any;

  constructor(private load: ScriptLoadService) {
  }

  draw(type) {
    const maps = window['google']['maps'];
    switch (type) {
      case 'marker':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.MARKER);
        let point = new window['google']['maps'].MarkerImage('assets/point.png',
          null,
          null,
          null,
          new maps.Size(30, 30)
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
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.MARKER);
        let cat = new maps.MarkerImage('assets/cat.png',
          null,
          null,
          null,
          new maps.Size(70, 70)
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
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.POLYGON);
        this.drawingManager.setOptions({
          polygonOptions: {
            fillColor: '#9c4d4f',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#401619',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'square':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.RECTANGLE);
        this.drawingManager.setOptions({
          rectangleOptions: {
            fillColor: '#fff82e',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#c8a535',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'polyline':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.POLYLINE);
        this.drawingManager.setOptions({
          polylineOptions: {
            fillColor: '#00b801',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#00b801',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'circle':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.CIRCLE);
        this.drawingManager.setOptions({
          circleOptions: {
            fillColor: '#00b801',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#00b801',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'pan':
        this.drawingManager.setDrawingMode(null);
        break;
      case 'save':
        this.drawingManager.setDrawingMode(null);
        this.map.data.toGeoJson(function (obj) {
          console.log(JSON.stringify(obj));
          console.log(obj);
        });
        break;
      default:
        this.drawingManager.setDrawingMode(null);
    }
  }

  ngAfterViewInit(): void {

    this.load.loadScript(url, 'gmap', () => {
      const maps = window['google']['maps'];
      console.log(maps);
      const loc = new maps.LatLng(51.561638, -0.14);

      const darkmap = new maps.StyledMapType(styledMap, {name: 'Dark Map'});

      this.map = new maps.Map(this.mapElm.nativeElement, {
        zoom: 11,
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
      this.map.mapTypes.set('dark_map', darkmap);
      this.map.setMapTypeId('dark_map');
      const drawControl = document.getElementById('draw-buttons');
      this.map.controls[maps.ControlPosition.TOP_LEFT].push(drawControl);

      this.drawingManager = new maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false  // i have my custom tools so i don't need the defaults to be displayed
      });
      this.drawingManager.setMap(this.map);

      maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
        console.log(event.type);
        event.overlay.addListener('rightclick', function () {
          event.overlay.setMap(null);
        });
        switch (event.type) {
          case 'polygon':
            this.map.data.add(new maps.Data.Feature({
              geometry: new maps.Data.Polygon([event.overlay.getPath().getArray()])
            }));
            break;
          case 'rectangle':
            let bounds = event.overlay.getBounds();
            let points = [
              bounds.getSouthWest(),
              {
                lat: bounds.getSouthWest().lat(),
                lng: bounds.getNorthEast().lng()
              },
              bounds.getNorthEast(),
              {
                lng: bounds.getSouthWest().lng(),
                lat: bounds.getNorthEast().lat()
              }
            ];
            this.map.data.add(new maps.Data.Feature({
              geometry: new maps.Data.Polygon([points])
            }));
            break;
          case 'polyline':
            this.map.data.add(new maps.Data.Feature({
              geometry: new maps.Data.LineString(event.overlay.getPath().getArray())
            }));
            break;
          case 'circle':
            this.map.data.add(new maps.Data.Feature({
              properties: {
                radius: event.overlay.getRadius()
              },
              geometry: new maps.Data.Point(event.overlay.getCenter())
            }));
            break;
          default:
            console.log('end');
        }
      });
    });
  }
}
