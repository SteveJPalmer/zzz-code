import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlPaginationComponent } from './hl-pagination.component';

describe('HlPaginationComponent', () => {
  let component: HlPaginationComponent;
  let fixture: ComponentFixture<HlPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
