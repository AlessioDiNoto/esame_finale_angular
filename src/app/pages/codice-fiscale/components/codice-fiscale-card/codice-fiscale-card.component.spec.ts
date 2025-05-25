import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodiceFiscaleCardComponent } from './codice-fiscale-card.component';

describe('CodiceFiscaleCardComponent', () => {
  let component: CodiceFiscaleCardComponent;
  let fixture: ComponentFixture<CodiceFiscaleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodiceFiscaleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodiceFiscaleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
