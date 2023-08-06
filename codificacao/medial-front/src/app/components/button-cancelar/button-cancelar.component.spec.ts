import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCancelarComponent } from './button-cancelar.component';

describe('ButtonCancelarComponent', () => {
  let component: ButtonCancelarComponent;
  let fixture: ComponentFixture<ButtonCancelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCancelarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
