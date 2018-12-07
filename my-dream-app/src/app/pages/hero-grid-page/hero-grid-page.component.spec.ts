import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGridPageComponent } from './hero-grid-page.component';

describe('HeroGridPageComponent', () => {
  let component: HeroGridPageComponent;
  let fixture: ComponentFixture<HeroGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
