import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialComponentComponent } from './historial-component.component';

describe('HistorialComponentComponent', () => {
  let component: HistorialComponentComponent;
  let fixture: ComponentFixture<HistorialComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
