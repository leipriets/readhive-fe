import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {combineLatest} from 'rxjs';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {CommonModule} from '@angular/common';
import { authActions } from '../../../containers/auth/store/actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzGridModule,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;

  headerNzType = this.isCollapsed ? 'menu-unfold' : 'menu-fold';

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.data$.subscribe(data => console.log(data));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
