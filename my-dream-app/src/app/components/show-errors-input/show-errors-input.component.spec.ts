import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowErrorsInputComponent } from './show-errors-input.component';

describe('ShowErrorsInputComponent', () => {
  let component: ShowErrorsInputComponent;
  let fixture: ComponentFixture<ShowErrorsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowErrorsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowErrorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
