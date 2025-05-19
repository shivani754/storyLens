import { TestBed } from '@angular/core/testing';

import { PhotoArchiveService } from './photo-archive.service';

describe('PhotoArchiveService', () => {
  let service: PhotoArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
