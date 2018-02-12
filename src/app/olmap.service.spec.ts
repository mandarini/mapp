import { TestBed, inject } from '@angular/core/testing';

import { OlmapService } from './olmap.service';

describe('OlmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OlmapService]
    });
  });

  it('should be created', inject([OlmapService], (service: OlmapService) => {
    expect(service).toBeTruthy();
  }));
});
