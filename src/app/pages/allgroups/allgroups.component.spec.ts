import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgroupsComponent } from './allgroups.component';

describe('AllgroupsComponent', () => {
  let component: AllgroupsComponent;
  let fixture: ComponentFixture<AllgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
