import { Component } from '@angular/core';
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

  constructor(private apiConnect:ApiConnectService) {

  }


  createSolict() {
    this.apiConnect.post('/solicitudes/',this.solict)
    .subscribe({
      next: (response:any) => {
        console.log(response)
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }


}
