import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerModel } from '../users.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue !: FormGroup;
  customerModelObj: CustomerModel = new CustomerModel();
  customerData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}
  

  
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : ['']
      // salary : ['']
    })
    this.getAllCustomer();
  }

  clickAddCustomer(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postCustomerDetails(){


    this.customerModelObj.id = this.formValue.value.id;
    this.customerModelObj.firstName = this.formValue.value.firstName;
    this.customerModelObj.lastName = this.formValue.value.lastName;
    this.customerModelObj.email = this.formValue.value.email;
    this.customerModelObj.mobile = this.formValue.value.mobile;
    // this.customerModelObj.salary = this.formValue.value.salary;

    this.api.postCustomer(this.customerModelObj)
    .subscribe(res=>{
      // console.log("Successfully added the customer details");
      console.log(res);
      alert("Customer added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCustomer();
    }
    ,
    err=>{
      alert("Something went wrong");
      console.error(err)
    }
    )
  }
  getAllCustomer(){
    this.api.getCustomer()
    .subscribe(res=>{
      this.customerData = res;
    })
  }
  deleteCustomer(row: any){
    this.api.deleteCustomer(row.id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getAllCustomer();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.customerModelObj.id = row.id;
    console.log(row.id)
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
  }
  updateCustomerDetails(){
    this.customerModelObj.firstName = this.formValue.value.firstName;
    this.customerModelObj.lastName = this.formValue.value.lastName;
    this.customerModelObj.email = this.formValue.value.email;
    this.customerModelObj.mobile = this.formValue.value.mobile;

    this.api.updateCustomer(this.customerModelObj,this.customerModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCustomer();
    })
  }
  
}