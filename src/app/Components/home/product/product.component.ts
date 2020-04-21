import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() public product;

  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  
  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    this.productAddToCart.emit(this.product);
  }

}
