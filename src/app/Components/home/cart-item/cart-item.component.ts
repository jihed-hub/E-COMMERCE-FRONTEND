import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

 private auth: string;
  cartlist: Cart[];
  totalSum: number = 0;
  
  constructor(private api: ApiService, private route: Router) { 
  }

  ngOnInit(): void {
    this.auth = this.api.getToken();
    this.api.getCartItems(this.auth).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }
  update(id, quantity) {
    this.api.updateCart(this.auth, id.value, quantity.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
        alert("Cart Updated Succefully.");
      });
    });
  }
  delete(id) {
    this.api.delCart(this.auth, id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  place() {
    this.api.place(this.auth).subscribe(res => {
      console.log(res);
    });
    this.route.navigate(['/home']);
    alert("SUCCESS")
  }

}
