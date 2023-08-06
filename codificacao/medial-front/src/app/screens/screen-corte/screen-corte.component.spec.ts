import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenCorteComponent } from './screen-corte.component';

describe('ScreenCorteComponent', () => {
  let component: ScreenCorteComponent;
  let fixture: ComponentFixture<ScreenCorteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenCorteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
