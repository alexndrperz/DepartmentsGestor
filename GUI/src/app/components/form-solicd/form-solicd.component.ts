import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectService } from 'src/app/service/api-connect.service';

@Component({
  selector: 'app-form-solicd',
  templateUrl: './form-solicd.component.html',
  styleUrls: ['./form-solicd.component.css']
})
export class FormSolicdComponent {

  solict:any = {
    name:'',
    email:'',
    quantity:''
  }
  @Output() isCreated:EventEmitter<any> = new EventEmitter()

  constructor(private apiConnect:ApiConnectService, private router:Router) {

  }


  createSolict(product_id:number,dep_id:number) {
    this.solict.producto_id = product_id;
    this.solict.department_id = dep_id; 
    
    this.apiConnect.post('/solicitudes/',this.solict)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        this.isCreated.emit()
   
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }


}
