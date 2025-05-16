import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEventoComponent } from './detalhe-evento.component';

describe('DetalheEventoComponent', () => {
  let component: DetalheEventoComponent;
  let fixture: ComponentFixture<DetalheEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
