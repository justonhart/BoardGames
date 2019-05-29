import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineReversiComponent } from './online-reversi.component';

describe('OnlineReversiComponent', () => {
  let component: OnlineReversiComponent;
  let fixture: ComponentFixture<OnlineReversiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineReversiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineReversiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
