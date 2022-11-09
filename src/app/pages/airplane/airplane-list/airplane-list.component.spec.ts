import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneListComponent } from './airplane-list.component';

describe('AirplaneListComponent', () => {
  let component: AirplaneListComponent;
  let fixture: ComponentFixture<AirplaneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
