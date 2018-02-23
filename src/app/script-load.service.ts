import { Injectable } from '@angular/core';

@Injectable()
export class ScriptLoadService {

  constructor() {}

  public loadScript(url, c): void {
    if (!document.getElementById('omap')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = 'omap';
      if (c) {
        script.addEventListener('load', function (e) {
          c(null, e);
        }, false);
      }
      document.head.appendChild(script);
    }
  }



}
