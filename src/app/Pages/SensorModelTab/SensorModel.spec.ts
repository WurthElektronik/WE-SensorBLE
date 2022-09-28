import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SensorModelTab } from './SensorModelTab';

describe('Tab2Page', () => {
  let component: SensorModelTab;
  let fixture: ComponentFixture<SensorModelTab>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SensorModelTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorModelTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
