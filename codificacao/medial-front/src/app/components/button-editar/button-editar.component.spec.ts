import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEditarComponent } from './button-editar.component';

describe('ButtonEditarComponent', () => {
  let component: ButtonEditarComponent;
  let fixture: ComponentFixture<ButtonEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
