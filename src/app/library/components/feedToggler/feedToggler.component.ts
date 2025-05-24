import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '@ngrx/store';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, NzTabsModule, NzIconModule],
  styleUrls: ['./feedToggler.component.css']
})
export class FeedTogglerComponent {
  @Input() tagName?: string = '';

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store, private router: Router) {}

  newTab() {

  }

  closeTab(): void {
    this.router.navigate(['global-feed'], {
      queryParams: {tab: 'globalFeed'},
      queryParamsHandling: 'merge', // Preserve existing query params
    });
  }
}
