import { TestBed } from '@angular/core/testing';

import { DataaccesslayerService } from './dataaccesslayer.service';

describe('DataaccesslayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataaccesslayerService = TestBed.get(DataaccesslayerService);
    expect(service).toBeTruthy();
  });
});
