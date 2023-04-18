import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPreviewComponent } from './recent-preview.component';

describe('RecentPreviewComponent', () => {
  let component: RecentPreviewComponent;
  let fixture: ComponentFixture<RecentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
