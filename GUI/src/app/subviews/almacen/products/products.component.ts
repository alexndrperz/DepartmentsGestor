import { Component,Input,OnInit,ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import jwtDecode from 'jwt-decode'
import { ApiConnectService } from 'src/app/service/api-connect.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private apiConnect:ApiConnectService) {}

  
  ngOnInit(): void {
    if (this.solicitudes_view == false) {

      const value:string | null = sessionStorage.getItem('auth')
      if(value != null) {
        this.userInfo = jwtDecode(value)

      }
      this.getProducts()
    }
  }


  @ViewChild(ModalComponent) modalComp!:ModalComponent;
  @Input() solicitudes_view:boolean | null = false
  @Input() dep:any= null;
  userInfo:any = null; 



  products:any[] = []
  origImg:any = "";
  selectedProduct:any = {
    
  };

  getProducts() {
    this.apiConnect.getSecure('/products/almacen')
    .subscribe({
      next: (response:any) => {
        console.log(response);
        this.products = response
      }
    })
  }

  getProductImg(item:any) {
    this.apiConnect.getImg(`/products/imagen/${item.id}`)
    .subscribe(
      {
        next: (response:any) => {
          console.log(response);
          let blob = new Blob([response], {type: 'image/png'});
          const file = new File([blob], 'imagen.jpg', { type: 'image/jpeg' });

          item.image = URL.createObjectURL(file)
          },
        error: (error:any) => {
          console.log(error)
        }
      }
    )
    
  }

   editar(object:any) {
    this.getProductImg(object)
    this.selectedProduct = object
    console.log(this.selectedProduct)
    
    this.modalComp.abrirModalEdicion()
  }

}
