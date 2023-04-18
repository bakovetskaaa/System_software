import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredPreviewComponent } from './starred-preview.component';

describe('StarredPreviewComponent', () => {
  let component: StarredPreviewComponent;
  let fixture: ComponentFixture<StarredPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarredPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarredPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
