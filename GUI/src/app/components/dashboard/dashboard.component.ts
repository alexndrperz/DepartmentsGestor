import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConnectService } from 'src/app/service/api-connect.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @Input()  solicitudes_view: boolean | null = false; 
  @Input()  encargados_view: boolean | null = false; 
  
  constructor(private router:Router) {

  }

  ngOnInit(): void {
    
  }

  logout():void {
    if (sessionStorage.getItem('auth')) {
      sessionStorage.removeItem('auth')
    }
    window.close()
    this.router.navigate(['/login'])
  }

} 
