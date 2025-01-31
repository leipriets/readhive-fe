import {Component, Input} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {
  NzDrawerModule,
} from 'ng-zorro-antd/drawer';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {DrawerService} from './services/drawerService.service';
import {CommonModule} from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsVisible } from './store/reducers';
import { drawerActions } from './store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzDrawerModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
  ],
})
export class DrawerComponent {
  @Input() title: string = 'Create';
  visible: any;

  drawerVisible$: Observable<boolean>;


  constructor(private store: Store, private drawerService: DrawerService) {
    this.drawerVisible$ = this.store.select(selectIsVisible);
  }

  toggleDrawer() {
    // this.visible = this.drawerService.toggleDrawer();
    // console.log(this.visible);
    this.store.dispatch(drawerActions.toggleDrawerOpen());

  }

  openDrawer(): void {
    // this.visible = true;
    this.store.dispatch(drawerActions.toggleDrawerOpen());
  }

  closeDrawer(): void {
    // this.store.dispatch(drawerActions.toggleDrawerClose());
    // this.visible = false;
    this.store.dispatch(drawerActions.toggleDrawerClose());
  }
}
