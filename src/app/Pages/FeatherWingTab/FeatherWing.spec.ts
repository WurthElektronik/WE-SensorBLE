import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FeatherWingTab } from './FeatherWingTab';

describe('Tab2Page', () => {
  let component: FeatherWingTab;
  let fixture: ComponentFixture<FeatherWingTab>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeatherWingTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatherWingTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
