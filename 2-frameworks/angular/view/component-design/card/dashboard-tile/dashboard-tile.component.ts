import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ql-dashboard-tile',
  templateUrl: './dashboard-tile.component.html',
  styleUrls: ['./dashboard-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTileComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() scrollCount = 1;

  scrollIndex = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ContentChild('scroll') scrollRef: TemplateRef<any>;

  next(): void {
    if (this.allowNext()) {
      this.scrollIndex++;
    }
  }

  prev(): void {
    if (this.allowPrev()) {
      this.scrollIndex--;
    }
  }

  allowNext(): boolean {
    return this.scrollIndex < this.scrollCount - 1;
  }

  allowPrev(): boolean {
    return this.scrollIndex > 0;
  }
}
