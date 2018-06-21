import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarViajeComponent } from './modificar-viaje.component';

describe('ModificarViajeComponent', () => {
  let component: ModificarViajeComponent;
  let fixture: ComponentFixture<ModificarViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
