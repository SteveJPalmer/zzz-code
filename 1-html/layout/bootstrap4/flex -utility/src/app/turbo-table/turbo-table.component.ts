import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turbo-table',
  templateUrl: './turbo-table.component.html',
  styleUrls: ['./turbo-table.component.scss']
})
export class TurboTableComponent implements OnInit {

  cars: any[] = [
     {  vin: 'ABC123', year: 2000, brand: 'ford', color: 'blue'},
     {  vin: 'XYZ987', year: 2018, brand: 'Audi', color: 'black'}
   ];

  constructor() { }

  ngOnInit(){
    console.info('>>Turbo-table - init');
  }

}
