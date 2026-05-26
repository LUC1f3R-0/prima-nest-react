import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUsComponent } from './find-us.component';

describe('FindUsComponent', () => {
  let component: FindUsComponent;
  let fixture: ComponentFixture<FindUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FindUsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
