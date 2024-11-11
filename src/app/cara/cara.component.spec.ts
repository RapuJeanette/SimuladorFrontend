import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraComponent } from './cara.component';

describe('CaraComponent', () => {
  let component: CaraComponent;
  let fixture: ComponentFixture<CaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
