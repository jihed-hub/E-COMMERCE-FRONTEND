import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];
  fileToUpload: File = null;
  showAdd = false;
  auth: string;
  constructor(private api: ApiService, private router: Router) { }

  imageUrl: string = "/assets/img/noimage.png";

  ngOnInit(): void {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(this.auth).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }
  addProd(desc, quan, price, prodname, image) {
    this.api.addProduct(this.auth, desc.value, quan.value, price.value, prodname.value, this.fileToUpload).subscribe(res => {
      this.products = res.oblist;
      alert("Product added succefully.");
    });
  }
  delProd(prodid) {
    this.api.delProduct(this.auth, prodid.value).subscribe(res => {
      this.products = res.oblist;
      alert("Product Deleted Succeflly.");
    });
  }
  edit(prodid) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "product": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);
  }

}
