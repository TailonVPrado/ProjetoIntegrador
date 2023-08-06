import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLinhaComponent } from './screen-linha.component';

describe('ScreenLinhaComponent', () => {
  let component: ScreenLinhaComponent;
  let fixture: ComponentFixture<ScreenLinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenLinhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
