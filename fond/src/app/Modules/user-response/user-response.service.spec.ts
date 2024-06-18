import { TestBed } from '@angular/core/testing';

import { UserResponseService } from './user-response.service';

describe('UserResponseService', () => {
  let service: UserResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
