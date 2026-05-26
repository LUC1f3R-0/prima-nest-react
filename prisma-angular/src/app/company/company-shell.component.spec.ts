import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShellComponent } from './company-shell.component';

describe('CompanyShellComponent', () => {
  let component: CompanyShellComponent;
  let fixture: ComponentFixture<CompanyShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyShellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
