import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { LayoutComponent } from './core/layout/layout.component'
import { AboutComponent } from './pages/about/about.component'
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { AirplaneListComponent } from './pages/airplane/airplane-list/airplane-list.component'
import { AirplaneDetailsComponent } from './pages/airplane/airplane-details/airplane-details.component'
import { AirplaneEditComponent } from './pages/airplane/airplane-edit/airplane-edit.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { AirportListComponent } from './pages/airport/airport-list/airport-list.component'
import { AirportEditComponent } from './pages/airport/airport-edit/airport-edit.component'
import { AirportDetailsComponent } from './pages/airport/airport-details/airport-details.component'
import { GateListComponent } from './pages/gate/gate-list/gate-list.component'
import { GateDetailsComponent } from './pages/gate/gate-details/gate-details.component'
import { GateEditComponent } from './pages/gate/gate-edit/gate-edit.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login' , component: LoginComponent},
      { path: 'register' , component: RegisterComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'about', component: AboutComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserEditComponent },
      { path: 'users/:id', component: UserDetailsComponent },
      { path: 'users/:id/edit', component: UserEditComponent },
      { path: 'airplanes', component: AirplaneListComponent },
      { path: 'airplanes/new', component: AirplaneEditComponent },
      { path: 'airplanes/:id', component: AirplaneDetailsComponent },
      { path: 'airplanes/:id/edit', component: AirplaneEditComponent },
      { path: 'airports', component: AirportListComponent },
      { path: 'airports/new', component: AirportEditComponent },
      { path: 'airports/:id', component: AirportDetailsComponent },
      { path: 'airports/:id/edit', component: AirplaneEditComponent },
      { path: 'gates', component: GateListComponent },
      { path: 'gates/new', component: GateEditComponent },
      { path: 'gates/:id', component: GateDetailsComponent },
      { path: 'gates/:id/edit', component: GateEditComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
