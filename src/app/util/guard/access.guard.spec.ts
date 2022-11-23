import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccessGuard } from './access.guard';

describe('AccessGuard', () => {
  let guard: AccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
    guard = TestBed.inject(AccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
