import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
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
  @Input() encargados_view:boolean | null = false 
 
  constructor(private apiConnect:ApiConnectService, private router:Router) {
    
  }

  ngOnInit() {
    const tokn = sessionStorage.getItem('auth')
    if(tokn) {
      const userInfo:any = jwtDecode(tokn)
      console.log(userInfo);
      
      this.solict.name = userInfo.name
      this.solict.email = userInfo.user_email
      this.solict.department_id = userInfo.dep_id
    }
    
  }
  createSolict(product_id:number,dep_id:number=this.solict.department_id) {
    this.solict.producto_id = product_id;
    this.solict.department_id = dep_id; 
    console.log(this.solict);
    
    
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
