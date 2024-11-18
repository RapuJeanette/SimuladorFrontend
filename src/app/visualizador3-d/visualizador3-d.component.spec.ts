import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visualizador3DComponent } from './visualizador3-d.component';

describe('Visualizador3DComponent', () => {
  let component: Visualizador3DComponent;
  let fixture: ComponentFixture<Visualizador3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Visualizador3DComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Visualizador3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
