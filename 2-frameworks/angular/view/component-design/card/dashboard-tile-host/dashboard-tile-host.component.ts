import { Component } from '@angular/core';

@Component({
  selector: 'ql-dashboard-tile-host',
  templateUrl: './dashboard-tile-host.component.html',
  styleUrls: ['./dashboard-tile-host.component.scss'],
})
export class DashboardTileHostComponent {
  data = [
    { name: 'foo', type: 1, message: 'blar' },
    { name: 'bar', type: 2, message: 'blarblar' },
    { name: 'baz', type: 3, message: 'blarblarblar' },
  ];
}
