import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridObraComponent } from './grid-obra.component';

describe('GridObraComponent', () => {
  let component: GridObraComponent;
  let fixture: ComponentFixture<GridObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
