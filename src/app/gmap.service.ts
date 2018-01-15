import { Injectable } from '@angular/core';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
/**
 Here is the google maps url link. You can also add libraries (places, drawing, etc) as URL params after the key
 */
const url = 'https://maps.googleapis.com/maps/api/js?key=' + your_API_key;

@Injectable()
export class GmapService {

  constructor() {}

  /**
   Load the Google Maps API script
   Just add the script to the head tag, as we would do normally.
   */
  public loadScript(c): void {
    if (!document.getElementById('gmap')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = 'gmap';
      if (c) {
        script.addEventListener('load', function (e) {
          c(null, e);
        }, false);
      }
      document.head.appendChild(script);
    }
  }

}
