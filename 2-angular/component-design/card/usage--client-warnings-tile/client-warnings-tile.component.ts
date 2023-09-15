import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@ql-ng/shared/components/base/base.component';
import { ClientFacade } from '../../store/facades/client.facade';
import { RouterStateUrl } from '@ql-ng/shared/utils/custom-routing-serializer';
import { ScssJsonUtils } from '@ql-ng/shared/utils/scss-json-utils';
import { WarningVm } from '@ql-ng/shared/view-models/warning.vm';
import { WarningTypeEnum } from '@ql-ng/shared/enum/warning-type.enum';

@Component({
  selector: 'ql-client-warnings-tile',
  templateUrl: './client-warnings-tile.component.html',
  styleUrls: ['./client-warnings-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientWarningsTileComponent extends BaseComponent implements OnInit, OnDestroy {
  scssJsonUtils = ScssJsonUtils;

  clientWarningStatus$ = this.clientFacade.clientWarningStatus$;

  clientWarnings: WarningVm[] = [];

  constructor(private clientFacade: ClientFacade) {
    super();
  }

  ngOnInit(): void {
    this.clientFacade.routerPath$
      .pipe(
        map((router: RouterStateUrl) => +router.params.clientNo),
        filter((clientNo: number) => !!clientNo),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((clientNo: number) => this.clientFacade.loadClientWarnings(clientNo));

    this.clientFacade.clientWarnings$
      .pipe(
        filter((warnings: WarningVm[]) => warnings !== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((warnings: WarningVm[]) => {
        this.clientWarnings = warnings.filter((warning: WarningVm) => warning.type === WarningTypeEnum.CLIENT && !(warning.isMain && !warning.warningText));
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.clientFacade.resetClientWarnings();
  }
}
