import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirCuerpoComponent } from './subir-cuerpo.component';

describe('SubirCuerpoComponent', () => {
  let component: SubirCuerpoComponent;
  let fixture: ComponentFixture<SubirCuerpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirCuerpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirCuerpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
