import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEsquadriaComponent } from './screen-esquadria.component';

describe('ScreenEsquadriaComponent', () => {
  let component: ScreenEsquadriaComponent;
  let fixture: ComponentFixture<ScreenEsquadriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenEsquadriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenEsquadriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
