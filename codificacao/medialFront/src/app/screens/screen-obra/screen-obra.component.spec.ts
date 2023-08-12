import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenObraComponent } from './screen-obra.component';

describe('ScreenObraComponent', () => {
  let component: ScreenObraComponent;
  let fixture: ComponentFixture<ScreenObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
