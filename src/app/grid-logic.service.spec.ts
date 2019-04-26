import { TestBed } from '@angular/core/testing';

import { GridLogicService } from './grid-logic.service';

describe('GridLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridLogicService = TestBed.get(GridLogicService);
    expect(service).toBeTruthy();
  });
});
