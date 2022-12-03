import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { LayoutComponent } from './core/layout/layout.component'
import { AboutComponent } from './pages/about/about.component'
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
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
import { AccessGuard } from './util/guard/access.guard'
import { SocialDashboardComponent } from './pages/social/social-dashboard/social-dashboard.component'
import { OtherUserComponent } from './pages/social/other-user/other-user.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login' , component: LoginComponent},
      { path: 'register' , component: RegisterComponent},
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        data: {requiresLogin: true},
        canActivate: [AccessGuard] 
      },
      { path: 'about', component: AboutComponent },
      { path: 'users',
        component: UserListComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard] 
      },
      { path: 'users/:id', 
        component: UserDetailsComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]   
      },
      { path: 'airplanes', 
        component: AirplaneListComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airplanes/new', 
        component: AirplaneEditComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airplanes/:id', 
        component: AirplaneDetailsComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airplanes/:id/edit', 
        component: AirplaneEditComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airports', 
        component: AirportListComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airports/new', 
        component: AirportEditComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airports/:id', 
        component: AirportDetailsComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard] 
      },
      { path: 'airports/:id/edit', 
        component: AirportEditComponent,
        data : {requiresLogin: true},
        canActivate: [AccessGuard]  
      },
      { path: 'airports/:id/gates', 
        component: GateListComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard]
      },
      { path: 'airports/:id/gates/new', 
        component: GateEditComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard] 
      },
      { path: 'airports/:airportId/gates/:gateId', 
        component: GateDetailsComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard] 
      },
      { path: 'airports/:id/gates/:gateId/edit', 
        component: GateEditComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard] 
      },
      {
        path: 'social',
        pathMatch: 'full',
        component: SocialDashboardComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard]
      },
      {
        path: 'social/user/:id',
        pathMatch: 'full',
        component: OtherUserComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard]
      },
      {
        path: 'social/user/:userId/airports/:id',
        pathMatch: 'full',
        component: AirportDetailsComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard]
      },
      {
        path: 'social/user/:userId/airplanes/:id',
        pathMatch: 'full',
        component: AirplaneDetailsComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard]
      },
      {
        path: 'social/user/:userId/airports/:airportId/gates/:gateId',
        pathMatch: 'full',
        component: GateDetailsComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard]
      }
    ]
  },
  // Everything else
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
