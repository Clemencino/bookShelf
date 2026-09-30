import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreChoose } from './store-choose';

describe('StoreChoose', () => {
  let component: StoreChoose;
  let fixture: ComponentFixture<StoreChoose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreChoose],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreChoose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
