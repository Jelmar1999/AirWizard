import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFollowedUsersComponent } from './not-followed-users.component';

describe('NotFollowedUsersComponent', () => {
  let component: NotFollowedUsersComponent;
  let fixture: ComponentFixture<NotFollowedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFollowedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFollowedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
