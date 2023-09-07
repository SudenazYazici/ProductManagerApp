import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductCategoryComponent } from './newproduct-category.component';

describe('NewproductCategoryComponent', () => {
  let component: NewproductCategoryComponent;
  let fixture: ComponentFixture<NewproductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewproductCategoryComponent]
    });
    fixture = TestBed.createComponent(NewproductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
