import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './model/customers';

@Injectable()
export class CustomerService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl)
      // catchError((error: any) => {
      //   console.error('Error fetching products:', error);
      //   throw error;
      // })
    // );
  }

  getCustomerById(id: number): Observable<Customer> {
    const customerUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(customerUrl); // .pipe(
    //   catchError((error: any) => {
    //     console.error(`Error fetching product with id ${id}:`, error);
    //     throw error;
    //   })
    // );
  }
}
