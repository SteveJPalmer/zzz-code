import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';   // ref to access data passed in
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<any>) {}

  onNoClick(): void {
    this.dialogRef.close('{data: cool-closedViaMethod}');
  }

}
