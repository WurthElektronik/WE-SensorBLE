import { TestBed } from '@angular/core/testing';

import { WebglService } from './webgl.service';

describe('WebglService', () => {
  let service: WebglService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebglService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
