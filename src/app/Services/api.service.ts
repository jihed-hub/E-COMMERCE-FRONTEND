import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
import { Address } from '../Models/address';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private LOGA_API = "http://localhost:8003/admin/verify";
  private ADD_PRD_API = "http://localhost:8003/admin/addProduct";
  private PRDLST_API = "http://localhost:8003/admin/getProducts";
  private DEL_PRD_API = "http://localhost:8003/admin/deleteProduct/";
  private UPD_PRD_API = "http://localhost:8003/admin/updateProduct";
  private ORD_API = "http://localhost:8003/admin/viewOrders";
  private UPD_ORD_API = "http://localhost:8003/admin/updateOrder";
  

  private LOGU_API = "http://localhost:8003/user/verify";
  private REG_API = "http://localhost:8003/user/signup";
  private PRDLST_APII = "http://localhost:8003/user/getProducts";
  private ADD_CART_API = "http://localhost:8003/user/addToCart/";
  private ADR_API = "http://localhost:8003/user/addAddress";
  private GT_ADR_API = "http://localhost:8003/user/getAddress";
  private VW_CART_API = "http://localhost:8003/user/viewCart";
  private UP_CART_API = "http://localhost:8003/user/updateCart";
  private DEL_CART_API = "http://localhost:8003/user/deleteCart/";
  private PLC_ORD_API = "http://localhost:8003/user/placeOrder";


  constructor(private http: HttpClient) { }

  //managing sessionStorage
  storeToken(token: string, auth_type: string) {
    window.sessionStorage.setItem("auth_token", token);
    window.sessionStorage.setItem("auth_type", auth_type); 
  }
  getAuthType(): string { 
    return sessionStorage.getItem("auth_type");
  }
  getToken() {
    return sessionStorage.getItem("auth_token");
  }
  removeToken() {
    window.sessionStorage.remove("auth_type");
    return sessionStorage.remove("auth_token");
  }
  signOut() {
    window.sessionStorage.clear();
  }
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

   // validating admin credentials
   adminLogin(user: User): Observable<any> {
    return this.http.post(this.LOGA_API,JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  
    // Add product for Logged AdminUser
   addProduct(auth: string, desc: string,
    quan: string, price: string, prodname: string, image: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);

    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.ADD_PRD_API, formData, { headers: myheader });
  }

   // Fetching all the products from the database
   getProducts(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.PRDLST_API, null, { headers: myheader });
  }

  // delete Product for Logged Admin User
  delProduct(auth: string, prodid: number) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.delete<any>(this.DEL_PRD_API + prodid, { headers: myheader })
  }

   // update Product for Logged Admin User
   updateProduct(auth: string, desc: string,
    quan: string, price: string, prodname: string, image: File, productid: any): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    formData.append("productid", productid);

    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.put<any>(this.UPD_PRD_API + productid , formData, { headers: myheader });
  } 

  //fetch orders by admin
  getOrders(auth: string) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.ORD_API, { headers: myheader })
  }

  //Update order fro admin
  update(auth: string, order: any) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(this.UPD_ORD_API, formData, { headers: myheader })
  }

  

  // validating user credentials
  userLogin(user: User): Observable<any> {
    return this.http.post(this.LOGU_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
    }

     // Registering the users to the database
  register(user: User): Observable<any> {
    return this.http.post(this.REG_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
    }
  
     // Fetching all the products from the database
   getProductsUser(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.PRDLST_APII, null, { headers: myheader });
  }

   // Add Products to the user Cart
   addCartItems(product: Product, auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.ADD_CART_API + product.productid, { headers: myheader });
  }

   // update Address of logged User
   upAddress(auth: string, adr: Address): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.ADR_API, adr, { headers: myheader });
  }

  // fetch address of logged user
  getAddress(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.GT_ADR_API, null, { headers: myheader });
  }

  //fetch cart of logged user
  getCartItems(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.VW_CART_API, { headers: myheader });
  }

   // aupdate quantity 
   updateCart(auth: string, prodid: number, quant: number): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.UP_CART_API + "?bufcartid=" + prodid + "&quantity=" + quant, { headers: myheader });
  }

  // delete cart Item from logged User's Cart item
  delCart(auth: string, bufdid: number): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.delete<any>(this.DEL_CART_API + bufdid, { headers: myheader });
  }

   // place the order of logged User
   place(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.PLC_ORD_API, { headers: myheader });
  }
}
