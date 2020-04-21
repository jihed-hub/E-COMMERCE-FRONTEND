import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { HomeComponent } from './Components/home/home.component';
import { EditItemComponent } from './Components/admin/edit-item/edit-item.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddressComponent } from './Components/home/address/address.component';
import { CartItemComponent } from './Components/home/cart-item/cart-item.component';
import { ProductComponent } from './Components/home/product/product.component';
import { OrderItemComponent } from './Components/admin/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NavigationComponent,
    HomeComponent,
    EditItemComponent,
    RegisterComponent,
    AddressComponent,
    CartItemComponent,
    ProductComponent,
    OrderItemComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
