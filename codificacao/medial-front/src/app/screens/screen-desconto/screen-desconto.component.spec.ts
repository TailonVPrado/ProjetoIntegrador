import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenDescontoComponent } from './screen-desconto.component';

describe('ScreenDescontoComponent', () => {
  let component: ScreenDescontoComponent;
  let fixture: ComponentFixture<ScreenDescontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenDescontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
