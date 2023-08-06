import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonExcluirComponent } from './button-excluir.component';

describe('ButtonExcluirComponent', () => {
  let component: ButtonExcluirComponent;
  let fixture: ComponentFixture<ButtonExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonExcluirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
