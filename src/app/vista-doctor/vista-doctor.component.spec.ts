import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDoctorComponent } from './vista-doctor.component';

describe('VistaDoctorComponent', () => {
  let component: VistaDoctorComponent;
  let fixture: ComponentFixture<VistaDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
