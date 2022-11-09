import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { AboutComponent } from 'src/app/pages/about/about.component'
import { UsecaseComponent } from 'src/app/pages/about/usecases/usecase.component'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule],
      declarations: [AppComponent, DashboardComponent, NavbarComponent, AboutComponent, UsecaseComponent]
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'Air Wizard'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Air Wizard')
  })
})
