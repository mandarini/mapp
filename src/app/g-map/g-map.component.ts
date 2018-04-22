import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { ScriptLoadService } from '../script-load.service';
import { HttpClient } from '@angular/common/http';
import { mapNumber } from '../../assets/functions/mapNumber';
import { styledMap } from '../../assets/mapStylingMaterial/styledMap';
import { customGradient } from '../../assets/mapStylingMaterial/gradient';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + your_API_key + '&libraries=visualization';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  @Input() clust = 5;

  private map: any;
  private maps: any;
  private coords: any;
  private markerCluster: any;
  private infowindow: any;
  lettings: string[];
  masts: string[];
  markers: any[];

  constructor(private load: ScriptLoadService, private http: HttpClient) {
  }

  city(city) {
   if (city === 'lon') {
     this.map.setCenter(this.coords(51.561638, -0.14));
   }
   if (city === 'man') {
     this.map.setCenter(this.coords(53.52476717517185, -2.5434842249308414));
   }
  }

  changeType(type) {
   if (type === 'dark') {
     this.map.setMapTypeId('dark_map');
   } else {
     this.map.setMapTypeId('roadmap');
   }
  }

  showMasts(bool) {
    if (bool) {
      this.markers.map((marker) => {
        marker.setMap(this.map);
      });
    } else {
      this.markers.map((marker) => {
        marker.setMap(null);
      });
    }
  }

  cluster(bool, clust) {
    if (bool) {
      const MarkerClusterer = window["MarkerClusterer"];
      this.markerCluster = new MarkerClusterer(this.map, this.markers, {imagePath: 'assets/m'});
      this.markerCluster.setGridSize(clust);
    } else {
      this.markerCluster.clearMarkers();
    }
  }

  changeCluster(value) {
    this.markerCluster.clearMarkers();
    this.cluster(true, parseInt(value, 10));
  }


  ngAfterViewInit(): void {

    this.load.loadScript(url, 'gmap', () => {
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

      this.markers = [];

      this.map.mapTypes.set('dark_map', darkmap);
      this.map.setMapTypeId('dark_map');

      const locControl = document.getElementById('location-buttons');
      this.map.controls[this.maps.ControlPosition.TOP_CENTER].push(locControl);

      this.map.data.loadGeoJson('assets/lonely.geojson');
      this.map.data.addListener('mouseover', (function (e) {
        this.legend.nativeElement.style.display = 'block';
        this.infoBox.nativeElement.innerText = e.feature.getProperty('PREVALENCE');
      }).bind(this));
      this.map.data.addListener('mouseout', (function (e) {
        this.legend.nativeElement.style.display = 'none';
      }).bind(this));
      this.map.data.setStyle(function (feature) {
        const lon = feature.getProperty('PREVALENCE');
        const value = 255 - Math.round(mapNumber(lon, 0, 5, 0, 255));
        const color = 'rgb(' + value + ',' + value + ',' + 0 + ')';
        return {
          fillColor: color,
          strokeWeight: 1
        };
      });

      this.map.data.addListener('click', (function(e) {
        console.log(e.latLng);
        this.infowindow.setPosition(e.latLng);
        this.infowindow.setContent(`<div class="overlay">
        <p><b>Prevalence factor of Loneliness of those over the age of 65: </b>
          ${e.feature.getProperty('PREVALENCE')}</p></div>`);
        this.infowindow.open(this.map);
      }).bind(this));
      this.infowindow = new this.maps.InfoWindow();

      this.http.get('assets/letting.json').subscribe(data => {
        this.lettings = data['data'];
        const heatmapData = [];
        this.lettings.map(x => {
          heatmapData.push({
            location: new this.maps.LatLng(x[24], x[23]),
            weight: parseInt(x[15], 10)
          });
        });
        const heatmap = new this.maps.visualization.HeatmapLayer({
          data: heatmapData
        });

        heatmap.set('gradient', customGradient);
        heatmap.set('radius', 70);
        heatmap.set('opacity', 1);
        // heatmap.setMap(this.map);
      });

      const antenna = new this.maps.MarkerImage('assets/antennabl.png',
        null,
        null,
        null,
        new this.maps.Size(25, 40)
      );
      this.http.get('assets/masts.json').subscribe(data => {
        this.masts = data['data'];
        console.log(this.masts[0][17]); // longitude
        console.log(this.masts[0][18]); // latitude

        this.masts.map(x => {
          let marker = new this.maps.Marker({
            position: new this.maps.LatLng(x[18], x[17]),
            icon: antenna,
          });
          this.markers.push(marker);
        });
      });

      const MarkerClusterer = window["MarkerClusterer"];
      this.markerCluster = [];

    });
  }


}
