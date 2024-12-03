import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntesDespuesComponent } from './antes-despues.component';

describe('AntesDespuesComponent', () => {
  let component: AntesDespuesComponent;
  let fixture: ComponentFixture<AntesDespuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntesDespuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntesDespuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
