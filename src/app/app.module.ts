import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { NavbarComponent } from './core/navbar/navbar.component'
import { LayoutComponent } from './core/layout/layout.component'
import { FooterComponent } from './core/footer/footer.component'
import { AboutComponent } from './pages/about/about.component'
import { UsecaseComponent } from './pages/about/usecases/usecase.component'
import { UserListComponent } from './pages/user/user-list/user-list.component'
import { UserDetailsComponent } from './pages/user/user-details/user-details.component'
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { AirplaneDetailsComponent } from './pages/airplane/airplane-details/airplane-details.component';
import { AirplaneEditComponent } from './pages/airplane/airplane-edit/airplane-edit.component'
import { AirplaneListComponent } from './pages/airplane/airplane-list/airplane-list.component';
import { RegisterComponent } from './pages/auth/register/register.component'
import { LoginComponent } from './pages/auth/login/login.component';
import { AirportListComponent } from './pages/airport/airport-list/airport-list.component';
import { AirportEditComponent } from './pages/airport/airport-edit/airport-edit.component';
import { AirportDetailsComponent } from './pages/airport/airport-details/airport-details.component';
import { GateListComponent } from './pages/gate/gate-list/gate-list.component';
import { GateEditComponent } from './pages/gate/gate-edit/gate-edit.component';
import { GateDetailsComponent } from './pages/gate/gate-details/gate-details.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    AboutComponent,
    UsecaseComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    AirplaneDetailsComponent,
    AirplaneEditComponent,
    AirplaneListComponent,
    RegisterComponent,
    LoginComponent,
    AirportListComponent,
    AirportEditComponent,
    AirportDetailsComponent,
    GateListComponent,
    GateEditComponent,
    GateDetailsComponent
  ],
  imports: [BrowserModule, RouterModule, NgbModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
