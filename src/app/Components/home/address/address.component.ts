import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/Models/address';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: any;
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phonenumber: ''
  };
  auth: string;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.auth = this.api.getToken();
    this.api.getAddress(this.auth).subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
      }
    }, err => {
      console.log(err);
    });
  }

  addAddress() {
    this.api.upAddress(this.auth, this.model).subscribe(res => {
      console.log(res);
      this.route.navigate(['/home']);
      alert("updated succefully");
    });
  }
}
