import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHostCustomCompsComponent } from './test-host-custom-comps.component';

describe('TestHostCustomCompsComponent', () => {
  let component: TestHostCustomCompsComponent;
  let fixture: ComponentFixture<TestHostCustomCompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostCustomCompsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostCustomCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
