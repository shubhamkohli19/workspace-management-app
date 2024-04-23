import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentWorkspaceComponent } from './rent-workspace.component';

describe('RentWorkspaceComponent', () => {
  let component: RentWorkspaceComponent;
  let fixture: ComponentFixture<RentWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
