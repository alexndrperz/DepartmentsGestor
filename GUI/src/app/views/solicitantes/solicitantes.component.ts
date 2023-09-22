import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConnectService } from 'src/app/service/api-connect.service';

@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styleUrls: ['./solicitantes.component.css']
})
export class SolicitantesComponent implements OnInit{
  token_dep:string | null = null; 
  solicitudes_view: boolean | null = null; 
  dep:  any = {name:'', recinto:''}
  
  constructor(private Actrouter:ActivatedRoute, private apiServ:ApiConnectService, private router:Router) {

  }

  ngOnInit(): void {
    this.Actrouter.params.subscribe(params => {
      this.token_dep = params['dept_token'] || null
      if (this.token_dep != null) {
        this.validateDepObj()
      } else {
        this.solicitudes_view =false;
      }
    })
    console.log(this.token_dep)
  }


  async validateDepObj():Promise<void> {
    this.apiServ.get(`/departamento/${this.token_dep}`) 
    .subscribe(
      { 
        next: (response:any) => {
          this.solicitudes_view = true
          this.dep = response
          console.log(response)
          
        },
        error: (error:any) => {
          console.log(error.error)
          this.router.navigate(['**'])
        } 
      }
    )
  }

} 
