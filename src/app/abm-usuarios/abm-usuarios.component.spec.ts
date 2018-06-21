import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmUsuariosComponent } from './abm-usuarios.component';

describe('AbmUsuariosComponent', () => {
  let component: AbmUsuariosComponent;
  let fixture: ComponentFixture<AbmUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
