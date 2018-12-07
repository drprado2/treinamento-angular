import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarHeroPageComponent } from './contratar-hero-page.component';

describe('ContratarHeroPageComponent', () => {
  let component: ContratarHeroPageComponent;
  let fixture: ComponentFixture<ContratarHeroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratarHeroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
