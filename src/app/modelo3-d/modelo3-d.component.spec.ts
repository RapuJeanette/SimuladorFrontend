import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modelo3DComponent } from './modelo3-d.component';

describe('Modelo3DComponent', () => {
  let component: Modelo3DComponent;
  let fixture: ComponentFixture<Modelo3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modelo3DComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modelo3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
