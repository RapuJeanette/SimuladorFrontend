import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaImagenComponent } from './guia-imagen.component';

describe('GuiaImagenComponent', () => {
  let component: GuiaImagenComponent;
  let fixture: ComponentFixture<GuiaImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaImagenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
