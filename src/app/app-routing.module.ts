import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-component/login.component';
import { AdminComponent } from './admin-component/admin.component';
import { AutorizeGuard } from './guard/autorize.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',    
    component: AdminComponent,
    canActivate: [AutorizeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
