import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  Soptions:string[] = ['12','1231','12312','123']
  myControl = new FormControl('');
  @Input() length:number = 0;
  options = ["22", "232", "asas"]

  @Output() changePage:EventEmitter<any> = new EventEmitter()

  goTopage(evt:PageEvent) {
    console.log(evt)
    this.changePage.emit(evt.pageIndex+1)
  }

  
  filterBy(evt:MatAutocompleteSelectedEvent):void {
    console.log(evt.option.value)
  }
}
