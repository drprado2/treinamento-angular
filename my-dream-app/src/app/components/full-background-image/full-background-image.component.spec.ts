import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBackgroundImageComponent } from './full-background-image.component';

describe('FullBackgroundImageComponent', () => {
  let component: FullBackgroundImageComponent;
  let fixture: ComponentFixture<FullBackgroundImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBackgroundImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBackgroundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
