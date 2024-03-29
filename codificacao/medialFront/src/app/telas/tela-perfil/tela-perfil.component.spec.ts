import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPerfilComponent } from './tela-perfil.component';

describe('ScreenPerfilComponent', () => {
  let component: ScreenPerfilComponent;
  let fixture: ComponentFixture<ScreenPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
