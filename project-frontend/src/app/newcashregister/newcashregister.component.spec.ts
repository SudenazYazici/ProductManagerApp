import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcashregisterComponent } from './newcashregister.component';

describe('NewcashregisterComponent', () => {
  let component: NewcashregisterComponent;
  let fixture: ComponentFixture<NewcashregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewcashregisterComponent]
    });
    fixture = TestBed.createComponent(NewcashregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
