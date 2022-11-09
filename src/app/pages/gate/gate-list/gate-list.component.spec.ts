import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateListComponent } from './gate-list.component';

describe('GateListComponent', () => {
  let component: GateListComponent;
  let fixture: ComponentFixture<GateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
