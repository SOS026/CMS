import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/customer.service';
import { Customer } from 'src/app/model/customers';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers: Customer[] = [];
  constructor(private customerService: CustomerService,private ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (customer) => {
        this.customers = customer;
      }
    );
  }

}


// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
// import { Product } from '../product.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// import { Subscription } from "rxjs";

// @Component({
//   selector: 'app-productList',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements OnInit {

//   products: Product[] = [];
//   constructor(private productService: ProductService,private ActivatedRoute: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe(
//       (product) => {
//         this.products = product;
//       }
//     );
//   }

  

//   // sortproducts:Product[]=[]
//   // sortproduct(){
//   // this.sortproducts=this.products.filter((product)=>(product.price >= 100))
//   // }



  

//   // addToCart(product: Product): void {
//   //   this.shoppingCart.addToCart(product); // Add product to the cart
//   // }
// }
