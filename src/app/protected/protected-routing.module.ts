import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenValidationGuard } from '../guards/token-validation.guard';

const routes: Routes = [
  {
    path:'',
    children: [ 
      { path: '',
        component: DashboardComponent,
        canActivate: [TokenValidationGuard],
        canLoad: [TokenValidationGuard]
      },
      { path: '**',redirectTo: ''}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
