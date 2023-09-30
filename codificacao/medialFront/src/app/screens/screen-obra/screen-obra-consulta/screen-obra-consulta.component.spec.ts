import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenObraConsultaComponent } from './screen-obra-consulta.component';

describe('ScreenObraConsultaComponent', () => {
  let component: ScreenObraConsultaComponent;
  let fixture: ComponentFixture<ScreenObraConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenObraConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenObraConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
