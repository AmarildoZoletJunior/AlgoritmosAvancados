import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaDaContaComponent } from './senha-da-conta.component';

describe('SenhaDaContaComponent', () => {
  let component: SenhaDaContaComponent;
  let fixture: ComponentFixture<SenhaDaContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenhaDaContaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenhaDaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
