import { Component, Input, OnInit } from '@angular/core';
import { ApiConnectService } from 'src/app/service/api-connect.service';
import jwtDecode from 'jwt-decode';
import { Route, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-solicitudes-table',
  templateUrl: './solicitudes-table.component.html',
  styleUrls: ['./solicitudes-table.component.css'],

})
export class SolicitudesTableComponent implements OnInit {

  ownHeaders:string[] = ['Id', 'Departamento', 'Producto','Fecha','Cantidad', 'Solicitante', 'Correo','Estatus', 'Acciones' ] 



  solicitudes:any[]=[]
  filter_selection:string ="1" 

  @Input() encargados_view:boolean |null = false
  constructor(private apiConnect:ApiConnectService, private router:Router) {}
  ngOnInit(): void {
    if (this.encargados_view) {
      this.ownHeaders = ['Id','Fecha','Solicitante','Producto','Cantidad','Estatus']
      this.getSolictsEnc("own")
    } else {
      this.getSolicts()
    }
    
  }


  getLink() {
    const tokn = sessionStorage.getItem('auth')
    let dep;
    if(tokn) {
      const userinfo:any =  jwtDecode(tokn)
      dep = userinfo.dep_id 
    }
    
    this.apiConnect.getSecure(`/department/token/${dep}`)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        navigator.clipboard.writeText(response.route)
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }

  filterData() {
    if (this.filter_selection == "1") {
      this.getSolictsEnc("own")
    } else if(this.filter_selection == "2") {
      this.getSolicts()
    }
  }



  getSolictsEnc(parameter:string="") {
    const tokn = sessionStorage.getItem('auth')
    let dep_id:number= 0;
    if(tokn) {
      let user:any = jwtDecode(tokn)
      dep_id = user.dep_id
    }
    let url = "";
    if(parameter == "own") {
      url = "/solicitudes/department?own=t"
    } else {
      url = "/solicitudes/department"
    }
    
    this.apiConnect.getSecure(url)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        this.solicitudes=response
      },
      error:(error:any) => {
        console.log(error)
      }
    })
    
  }

  getSolicts(page:number = 1) {
    console.log(page)
    this.apiConnect.getSecure(`/solicitudes?page=${page}`)
    .subscribe(
      {
        next:(response:any) => {
          console.log(response);
          this.solicitudes = response.data
          
        },
        error:(error:any) => {
          console.log(error)
        }
      }
    )
  }

  modifyStatus(option:number,solic_id:number) {
    this.apiConnect.putSecure(`/solicitudes/${solic_id}/`,{option:option})
    .subscribe(
      {
        next: (response:any) => {
          this.getSolicts()
        },
        error:(error:any) => {
          console.log(error)
        }
      }
    )
  }

}
