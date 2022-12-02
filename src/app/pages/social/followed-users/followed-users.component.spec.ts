import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedUsersComponent } from './followed-users.component';

describe('FollowedUsersComponent', () => {
  let component: FollowedUsersComponent;
  let fixture: ComponentFixture<FollowedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
