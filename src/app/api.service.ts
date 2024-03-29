import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { map } from "rxjs";

@Injectable ({
    providedIn: "root"
})
export class ApiService {
    constructor(private http : HttpClient) {}

    postCustomer (data: any){
        return this.http.post<any>("http://localhost:3000/users", data)
        .pipe(map((res:any)=>{
            return res;
        }))
    }
    getCustomer() {
        return this.http.get<any>("http://localhost:3000/users")
        .pipe(map((res:any)=>{
            return res;
        })) 
    }
    updateCustomer(data:any, id:number){
        return this.http.put<any>("http://localhost:3000/users/"+ id,data)
        .pipe(map((res:any)=>{
            return res;
        }))
    }
    deleteCustomer(id:number){
        return this.http.delete<any>("http://localhost:3000/users/"+id)
        .pipe(map((res:any)=>{
            return res;
        }))
    }

}