import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorPdfComponent } from './lector-pdf.component';

describe('LectorPdfComponent', () => {
  let component: LectorPdfComponent;
  let fixture: ComponentFixture<LectorPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectorPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
