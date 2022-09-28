import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AttributeGraphTab } from './AttributeGraphTab';

describe('Tab2Page', () => {
  let component: AttributeGraphTab;
  let fixture: ComponentFixture<AttributeGraphTab>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeGraphTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeGraphTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
