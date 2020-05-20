import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaformComponent } from './taform.component';

describe('TaformComponent', () => {
  let component: TaformComponent;
  let fixture: ComponentFixture<TaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
