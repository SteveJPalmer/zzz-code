import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DashboardTileComponent } from './dashboard-tile.component';

describe('DashboardTileComponent Suite', () => {
  const scrollSingle = [{ name: 'blar' }];
  const scrollMultiple = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];

  describe('DashboardTileComponent', () => {
    let fixture: ComponentFixture<DashboardTileComponent>;
    let component: DashboardTileComponent;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [DashboardTileComponent],
        })
          .compileComponents()
          .then(() => {
            fixture = TestBed.createComponent(DashboardTileComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
          });
      })
    );

    it('should create DashboardTileComponent', () => {
      expect(component).toBeTruthy();
    });
  });

  @Component({
    template: `<ql-dashboard-tile [icon]="'property'" [title]="'General'">
      <section class="content">
        <span>testContent</span>
      </section>
    </ql-dashboard-tile>`,
  })
  class HostComponent {}

  describe('Host Component', () => {
    let fixture: ComponentFixture<HostComponent>;
    let hostComponent: HostComponent;
    let elem: DebugElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [HostComponent, DashboardTileComponent],
        })
          .compileComponents()
          .then(() => {
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
          });
      })
    );

    it('should create host component', () => {
      hostComponent = fixture.componentInstance;
      expect(hostComponent).toBeTruthy();
    });

    it('should display input title within header', () => {
      elem = fixture.debugElement.query(By.css('.header-title'));
      expect(elem.nativeElement.innerText).toBe('GENERAL');
    });

    it('should display input icon within header', () => {
      elem = fixture.debugElement.query(By.css('mat-icon'));
      expect(elem).toBeTruthy();
    });

    it('should add transcluded content within body', () => {
      elem = fixture.debugElement.query(By.css('.ng-content-container'));
      expect(elem.nativeElement.innerText).toMatch(/testContent/);
    });
  });

  @Component({
    template: `<ql-dashboard-tile [icon]="'property'" [title]="'Multiple'" [scrollCount]="data.length">
      <ng-template #scroll let-index>
        <section class="content">
          <span>{{ data[index].name }}</span>
        </section>
      </ng-template>
    </ql-dashboard-tile>`,
  })
  class HostScrollComponent {
    data = scrollMultiple;
  }

  describe('Host Component with Scroll', () => {
    let fixture: ComponentFixture<HostScrollComponent>;
    let hostComponent: HostScrollComponent;
    let elem: DebugElement;

    enum ScrollIcons {
      prev,
      next,
    }

    const clickNextIcon = (): void => {
      clickIcon(ScrollIcons.next);
    };

    const clickPrevIcon = (): void => {
      clickIcon(ScrollIcons.prev);
    };

    const clickIcon = (index: number): void => {
      const scrollIcons = fixture.debugElement.queryAll(By.css('.header-scroll mat-icon'));
      scrollIcons[index].triggerEventHandler('click', null);
      fixture.detectChanges();
    };

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [HostScrollComponent, DashboardTileComponent],
        })
          .compileComponents()
          .then(() => {
            fixture = TestBed.createComponent(HostScrollComponent);
            hostComponent = fixture.componentInstance;
          });
      })
    );

    it('should create host component', () => {
      fixture.detectChanges();
      expect(hostComponent).toBeTruthy();
    });

    it('should input a scroll count', () => {
      fixture.detectChanges();
      const tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
      expect(tileComp.componentInstance.scrollCount).toBe(3);
    });

    describe('when single item', () => {
      it('should not display scroll icons', () => {
        hostComponent.data = scrollSingle;
        fixture.detectChanges();
        elem = fixture.debugElement.query(By.css('.header-scroll'));
        expect(elem).toBeFalsy();
      });

      it('should display the single items content', () => {
        hostComponent.data = scrollSingle;
        fixture.detectChanges();
        elem = fixture.debugElement.query(By.css('.ng-content-container'));
        expect(elem.nativeElement.innerText).toMatch(/blar/);
      });
    });

    describe('when multiple items', () => {
      it('should display scroll icons', () => {
        fixture.detectChanges();
        elem = fixture.debugElement.query(By.css('.header-scroll'));
        expect(elem).toBeTruthy();
      });

      it('should display label of number items to scroll', () => {
        fixture.detectChanges();
        elem = fixture.debugElement.query(By.css('.scroll-label'));
        expect(elem.nativeElement.innerText).toContain('1 of 3');
      });

      it('should display content for initial scroll item', () => {
        fixture.detectChanges();
        elem = fixture.debugElement.query(By.css('.ng-content-container'));
        expect(elem.nativeElement.innerText).toMatch(/foo/);
      });

      it(
        'should increment scroll index when next icon clicked',
        waitForAsync(() => {
          fixture.detectChanges();
          clickNextIcon();
          fixture.whenStable().then(() => {
            const tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
            expect(tileComp.componentInstance.scrollIndex).toBe(1);
          });
        })
      );

      it(
        'should display content for next scroll item, when next icon clicked',
        waitForAsync(() => {
          fixture.detectChanges();
          clickNextIcon();
          fixture.whenStable().then(() => {
            elem = fixture.debugElement.query(By.css('.ng-content-container'));
            expect(elem.nativeElement.innerText).toMatch(/bar/);
          });
        })
      );

      it('should not increment scroll index when next icon clicked if on last scroll item', fakeAsync(() => {
        fixture.detectChanges();
        clickNextIcon();
        clickNextIcon();
        tick();
        let tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
        expect(tileComp.componentInstance.scrollIndex).toBe(2);
        clickNextIcon();
        tick();
        tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
        expect(tileComp.componentInstance.scrollIndex).toBe(2);
      }));

      it(
        'should not decrement scroll index when prev icon clicked if on first item',
        waitForAsync(() => {
          fixture.detectChanges();
          clickPrevIcon();
          fixture.whenStable().then(() => {
            const tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
            expect(tileComp.componentInstance.scrollIndex).toBe(0);
          });
        })
      );

      it('should decrement scroll index when prev icon clicked and not on first item', fakeAsync(() => {
        fixture.detectChanges();
        clickNextIcon();
        tick();
        let tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
        expect(tileComp.componentInstance.scrollIndex).toBe(1);
        clickPrevIcon();
        tick();
        tileComp = fixture.debugElement.query(By.directive(DashboardTileComponent));
        expect(tileComp.componentInstance.scrollIndex).toBe(0);
      }));

      it('should change content when navigate via prev and next icon clicks', fakeAsync(() => {
        fixture.detectChanges();
        clickNextIcon();
        clickNextIcon();
        tick();
        elem = fixture.debugElement.query(By.css('.ng-content-container'));
        expect(elem.nativeElement.innerText).toMatch(/baz/);
        clickPrevIcon();
        tick();
        elem = fixture.debugElement.query(By.css('.ng-content-container'));
        expect(elem.nativeElement.innerText).toMatch(/bar/);
      }));
    });
  });
});
