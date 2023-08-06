import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDefaultComponent } from './button-default.component';

describe('ButtonDefaultComponent', () => {
  let component: ButtonDefaultComponent;
  let fixture: ComponentFixture<ButtonDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
