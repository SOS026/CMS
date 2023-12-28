import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Customer } from './model/customers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/model/customers';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  allCustomers: Customer[] =[];
  myForm!:FormGroup;
  constructor(private http: HttpClient,
    private fb:FormBuilder){

  }

  // ngOnInit(){
  //   this.myForm = this.fb.group({
  //     name:[""],
  //     age:[""],
  //     mobilenumber:[""],
  //     gender:[""]
  //   })
  //   this.fetchCustomers();
  // }

  ngOnInit(){
    this.fetchCustomers();
  }
  onCustomerFetch(){
    this.fetchCustomers();
  }

  onCustomerCreate(customers: {Name: string, desc: string, age: string}){
    console.log(customers);
    const headers = new HttpHeaders({'myHeader':'SS'});
    this.http.post<{name: string}>('http://localhost:3000/customers', customers, {headers: headers})
    .subscribe((res)=>{
      console.log(res);
    });
  }

  private fetchCustomers(){
    this.http.get('http://localhost:3000/customers')
    .pipe(map((res: {[key: string]: Customer})=> {
      const customers = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          customers.push({...res[key], id: key})  // ... = spread operator
        }
      }
      return customers;
    }))
    .subscribe((customers)=>{
      console.log(customers);
      this.allCustomers = customers;
    })
  }

  onSubmit(){
    debugger
    this.myForm.value
  }

}
