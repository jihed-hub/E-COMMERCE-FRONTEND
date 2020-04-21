import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EditItemComponent } from './Components/admin/edit-item/edit-item.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddressComponent } from './Components/home/address/address.component';
import { CartItemComponent } from './Components/home/cart-item/cart-item.component';
import { OrderItemComponent } from './Components/admin/order-item/order-item.component';


const routes: Routes = [
  { path: '',redirectTo: '/login',pathMatch: 'full'},
  { path:'login',component: LoginComponent},
  { path:'admin',component: AdminComponent},
  { path:'admin/edit',component: EditItemComponent,canActivate:[AuthGuardService]},
  { path:'admin/order', component: OrderItemComponent,canActivate:[AuthGuardService]},
  { path:'home',component: HomeComponent,canActivate:[AuthGuardService]},
  { path:'home/address', component: AddressComponent,canActivate:[AuthGuardService]},
  { path:'home/cart',component: CartItemComponent,canActivate:[AuthGuardService]},
  { path:'register',component: RegisterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
