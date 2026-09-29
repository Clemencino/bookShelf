import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreateAccount } from './user-create-account';

describe('UserCreateAccount', () => {
  let component: UserCreateAccount;
  let fixture: ComponentFixture<UserCreateAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreateAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreateAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
