import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmViajesComponent } from './abm-viajes.component';

describe('AbmViajesComponent', () => {
  let component: AbmViajesComponent;
  let fixture: ComponentFixture<AbmViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
