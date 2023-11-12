import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormulaComponent } from './input-formula.component';

describe('InputFormulaComponent', () => {
  let component: InputFormulaComponent;
  let fixture: ComponentFixture<InputFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
