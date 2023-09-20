import { Component, HostListener,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  selectedImageSrc: string | ArrayBuffer | null = null;

  constructor() {
    this.fileInput = new ElementRef(null)
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
