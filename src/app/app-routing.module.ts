import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SelectServiceComponent } from './pages/select-service/select-service.component';
import { RentWorkspaceComponent } from './pages/rent-workspace/rent-workspace.component';
import { AuthGuard } from './guards/auth-guard';
import { NotAuthGuard } from './guards/not-auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , canActivate: [NotAuthGuard]},
  { path: 'signup', component: SignupComponent , canActivate: [NotAuthGuard]},
  { path: 'homepage', component: HomepageComponent },
  { path: 'select-service', component: SelectServiceComponent, canActivate: [AuthGuard] },
  { path: 'rent-workspace', component: RentWorkspaceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}