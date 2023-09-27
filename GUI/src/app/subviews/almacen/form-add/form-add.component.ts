import { Component, HostListener,ElementRef,ViewChild, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ApiConnectService } from 'src/app/service/api-connect.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef;

  selectedImageSrc: string | ArrayBuffer | null = null;
  @Input() modal:boolean =  false;
  @Input() product:any = {
    name:'',
    model:''
  };
  @Output() updt:EventEmitter<any> = new EventEmitter()

  constructor(private apiConnect:ApiConnectService, private router:Router) {
    this.fileInput = new ElementRef(null)
  }
  ngOnInit(): void {

  }


  SaveProduct(product:any) {
    const properties = Object.keys(product);
    let formData = new FormData()

    console.log(product)
    for (let i = 0; i < properties.length; i++) {
      const propiedad = properties[i];
      const valor = product[propiedad];
      formData.append(propiedad, valor)
    }
    
    this.apiConnect.postSecure('/products/almacen', formData)
    .subscribe({
      next: (response:any) => {
        this.router.navigate(['/almacen/productos'])
      },
      error:(error:any) => {
        console.log(error)
      }
    })

  }

  SaveChanges() {
    const ObjCopy = {...this.product}

    if (this.product.almacen) {
      delete ObjCopy.almacen
    }
    if (this.selectedImageSrc == null) {
      delete ObjCopy.image
    }
    const properties = Object.keys(ObjCopy);
    let formData = new FormData()

    console.log(ObjCopy)
    for (let i = 0; i < properties.length; i++) {
      const propiedad = properties[i];
      const valor = ObjCopy[propiedad];
      formData.append(propiedad, valor)
    }


    this.apiConnect.putSecure(`/products/almacen/${this.product.id}`, formData)
    .subscribe({
      next:(response:any) => {
        console.log(response)
      },
      error:(error:any) => {
        console.log(error)
      },
      complete:(resp:any) => {
        this.updt.emit()
     
      }
    })
  }
  
  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onDrop(event: any) {
    event.preventDefault();
    console.log(event)

    let files = null
    if(event.type =="change") {
      files  = event.target.files;
    }
    else {
       files = event.dataTransfer.files;
    }
     
    this.handleImageUpload(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', selectedFile);
  }



  handleImageUpload(files: FileList) {
    const file = files[0];
    this.product.image = file
    console.log(file)
    if (file) {
      // Cargar la imagen seleccionada como una URL de datos (data URL)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageSrc = e.target.result;
  
      };
      reader.readAsDataURL(file);
    }
  }

}
