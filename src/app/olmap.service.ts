import { Injectable } from '@angular/core';

const url = 'https://openlayers.org/en/v4.6.4/build/ol.js';

@Injectable()
export class OlmapService {

  constructor() {}

  public loadScript(c): void {
    if (!document.getElementById('olmap')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = 'olmap';
      if (c) {
        script.addEventListener('load', function (e) {
          c(null, e);
        }, false);
      }
      document.head.appendChild(script);
    }
  }

}
