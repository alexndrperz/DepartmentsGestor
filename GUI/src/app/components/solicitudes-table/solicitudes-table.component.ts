import { Component, Input, OnInit } from '@angular/core';
import { ApiConnectService } from 'src/app/service/api-connect.service';
import jwtDecode from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes-table',
  templateUrl: './solicitudes-table.component.html',
  styleUrls: ['./solicitudes-table.component.css']
})
export class SolicitudesTableComponent implements OnInit {

  ownHeaders:string[] = ['Id', 'Departamento', 'Producto','Fecha','Cantidad', 'Solicitante', 'Correo','Estatus', 'Acciones' ] 

  solicitudes:any[]=[]
  @Input() encargados_view:boolean |null = false
  constructor(private apiConnect:ApiConnectService, private router:Router) {}
  ngOnInit(): void {
    if (this.encargados_view) {
      this.ownHeaders = ['Id','Fecha','Solicitante','Producto','Estatus']
      this.getSolictsEnc()
    } else {
      this.getSolicts()
    }
    
  }

  getSolictsEnc() {
    const tokenInfo=sessionStorage.getItem('auth')
    if(tokenInfo) {
      const userInfo:any = jwtDecode(tokenInfo)
      console.log(userInfo)

    }
    else {
      this.router.navigate(['/login'])
    }
    
  }

  getSolicts() {
    this.apiConnect.getSecure('/solicitudes')
    .subscribe(
      {
        next:(response:any) => {
          this.solicitudes = response
          
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
