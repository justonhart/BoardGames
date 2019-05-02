import { TestBed } from '@angular/core/testing';

import { ReversiLogicService } from './reversi-logic.service';

describe('GridLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReversiLogicService = TestBed.get(ReversiLogicService);
    expect(service).toBeTruthy();
  });
});
