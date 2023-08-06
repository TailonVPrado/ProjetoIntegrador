import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSalvarComponent } from './button-salvar.component';

describe('ButtonSalvarComponent', () => {
  let component: ButtonSalvarComponent;
  let fixture: ComponentFixture<ButtonSalvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSalvarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSalvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
