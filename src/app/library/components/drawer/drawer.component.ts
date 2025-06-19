import {Component, Input, OnInit} from '@angular/core';
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
export class DrawerComponent implements OnInit {
  @Input() title: string = 'Create';
  visible: any;

  drawerVisible$: Observable<boolean>;
  drawerWidth: string | number = 400;

  constructor(private store: Store, private drawerService: DrawerService) {
    this.drawerVisible$ = this.store.select(selectIsVisible);
  }

  ngOnInit(): void {
    this.setResponsiveDrawerWidth();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.setResponsiveDrawerWidth();
  }
  
  setResponsiveDrawerWidth(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.drawerWidth = '100%'; // full width on small screens
    } else if (width < 1024) {
      this.drawerWidth = '80%';
    } else {
      this.drawerWidth = 1000;
    }
  }

  toggleDrawer() {
    // this.visible = this.drawerService.toggleDrawer();
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
