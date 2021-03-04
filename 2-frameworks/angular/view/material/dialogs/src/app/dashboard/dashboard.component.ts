import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '30vw',
      minWidth: '20vw',
      maxWidth: '50vw',
      data: {name: 'test'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`>>dialog closed: ${result}`);
    });
  }

}
