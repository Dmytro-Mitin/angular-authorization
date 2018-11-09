import { TestBed, async, inject } from '@angular/core/testing';

import { AutorizeGuard } from './autorize.guard';

describe('AutorizeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorizeGuard]
    });
  });

  it('should ...', inject([AutorizeGuard], (guard: AutorizeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
