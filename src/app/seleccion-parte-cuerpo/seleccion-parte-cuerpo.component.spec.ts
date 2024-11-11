import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionParteCuerpoComponent } from './seleccion-parte-cuerpo.component';

describe('SeleccionParteCuerpoComponent', () => {
  let component: SeleccionParteCuerpoComponent;
  let fixture: ComponentFixture<SeleccionParteCuerpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionParteCuerpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionParteCuerpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
