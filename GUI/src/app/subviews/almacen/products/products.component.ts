import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  data:any[] = [
    {id: 1, name: "Producto", available_quantity: 4, delivered_hours_estimated: 5},
    {id: 2, name: "Producto", available_quantity: 4, delivered_hours_estimated: 5},
    {id: 3, name: "Producto", available_quantity: 8, delivered_hours_estimated: 5},
    {id: 4, name: "Producto", available_quantity: 4, delivered_hours_estimated: 5},
    {id: 5, name: "Producto", available_quantity: 10, delivered_hours_estimated: 12},
    {id: 6, name: "Producto", available_quantity: 12, delivered_hours_estimated: 2},
    {id: 7, name: "Producto", available_quantity: 4, delivered_hours_estimated: 5},
  ]
}
