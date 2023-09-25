import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
 mostrarModal: boolean | null = null;
 @Output() saveChanges: EventEmitter<any> = new EventEmitter()
 @Output() solict: EventEmitter<any> = new EventEmitter()
 isEdition:boolean = false;
 productInfo:any | null = null;

  abrirModalEdicion() {
    this.mostrarModal = true;
    this.isEdition = true
  }

  abrirModalSolic() {
    this.mostrarModal= true
  }

  guardarCambios() {
    this.saveChanges.emit()
  }

  guardarSolicitud() {
    this.solict.emit()
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

}
