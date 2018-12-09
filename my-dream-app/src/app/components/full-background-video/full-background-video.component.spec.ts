import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBackgroundVideoComponent } from './full-background-video.component';

describe('FullBackgroundVideoComponent', () => {
  let component: FullBackgroundVideoComponent;
  let fixture: ComponentFixture<FullBackgroundVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBackgroundVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBackgroundVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
