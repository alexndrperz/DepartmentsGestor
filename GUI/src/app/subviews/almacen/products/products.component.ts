import { Component,Input,OnInit,ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import jwtDecode from 'jwt-decode'
import { ApiConnectService } from 'src/app/service/api-connect.service';
import { FormAddComponent } from '../form-add/form-add.component';
import { ActivatedRoute } from '@angular/router';
import { FormSolicdComponent } from 'src/app/components/form-solicd/form-solicd.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private apiConnect:ApiConnectService, private Actrouter:ActivatedRoute) {}

  
  ngOnInit(): void {
    console.log(this.solicitudes_view)
    if (this.solicitudes_view == false) {
      const value:string | null = sessionStorage.getItem('auth')
      if(value != null) {
        this.userInfo = jwtDecode(value)
        this.getProductsAlm()
      }
    }
    else if (this.solicitudes_view){
      this.Actrouter.params.subscribe(params => {
        this.token_dep = params['dept_token'] || null
        if (this.token_dep != null) {
          this.getProductsSolic()
        } 
      })
    }
  }


  @ViewChild(ModalComponent) modalComp!:ModalComponent;
  @ViewChild(FormAddComponent) formAdd!:FormAddComponent;
  @ViewChild(FormSolicdComponent) formSolic!:FormSolicdComponent;
  
  @Input() solicitudes_view:boolean | null = false
  @Input() encargados_view:boolean | null = false
  @Input() dep:any= null;
  showAlert:boolean = false;
  product_id:number = 0;
  userInfo:any = null; 
  token_dep:string =""


  products:any[] = []
  origImg:any = "";
  selectedProduct:any = {
    
  };

  closeModal() {
    this.modalComp.cerrarModal()
  }


  getProductsAlm() {
    this.apiConnect.getSecure('/products/almacen')
    .subscribe({
      next: (response:any) => {
        console.log(response);
        this.products = response
      }
    })
  }

  saveSolic() {
    console.log("el final alan")
    console.log(this.dep);
    console.log(this.product_id);
    
    
    this.formSolic.createSolict(this.product_id, this.dep.department_id)
  }

  getProductsSolic() {
    this.apiConnect.get(`/products/${this.token_dep}`)
    .subscribe({
      next: (response:any) => {
        console.log(response);
        this.products = response
      }
    })
  }

  makeSolic(product:any) {
    this.product_id = product.id 
    
    this.modalComp.abrirModalSolic()
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

  saveEdit() {
    console.log("emitter")
    this.formAdd.SaveChanges()
    
  }

   editar(object:any) {
    this.getProductImg(object)
    this.selectedProduct = object
    console.log(this.selectedProduct)
    
    this.modalComp.abrirModalEdicion()
  }

}
