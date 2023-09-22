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
  
  ngOnInit(): void {
    
  }

} 
