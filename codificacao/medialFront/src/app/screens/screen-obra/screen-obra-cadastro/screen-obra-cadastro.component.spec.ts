import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenObraCadastroComponent } from './screen-obra-cadastro.component';

describe('ScreenObraCadastroComponent', () => {
  let component: ScreenObraCadastroComponent;
  let fixture: ComponentFixture<ScreenObraCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenObraCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenObraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
