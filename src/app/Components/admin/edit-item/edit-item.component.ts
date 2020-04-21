import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  product: Product = {
    productid: 0,
    description: '',
    price: 0,
    productname: '',
    quantity: 0,
    productimage: null
  };
  products: Product[] = [];
  fileToUpload: File = null;
  auth: string;
  prodid: string; 
  imageUrl: string = "/assets/img/noimage.png";

  constructor(private route: ActivatedRoute, private api: ApiService) {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(this.auth).subscribe(
        res => {
          res.oblist.forEach(pro => {
            if (pro.productid == this.prodid) {
              this.product = pro;
              this.fileToUpload = pro.productimage;
            }
          });
        }
      );
    }
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.prodid = params["product"];
    });
  }

  
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  updateProd(desc, quan, price, prodname, image) {
    this.api.updateProduct(this.auth, desc.value, quan.value, price.value, prodname.value, this.fileToUpload, this.product.productid).subscribe(res => {
      alert("Product Updated Succefully.");
    });
  }

}
