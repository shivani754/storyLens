import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumGridComponent } from './album-grid.component';

describe('AlbumGridComponent', () => {
  let component: AlbumGridComponent;
  let fixture: ComponentFixture<AlbumGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
