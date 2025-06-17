import {Component, OnInit} from '@angular/core';

import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAffixModule} from 'ng-zorro-antd/affix';

import {combineLatest, take} from 'rxjs';

import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import {Store} from '@ngrx/store';
import {popularTagActions} from './store/actions';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {SearchProfileComponent} from '../searchProfile/components/searchProfile.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { selectCurrentUser } from '../../../containers/auth/store/reducers';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['./popularTags.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzTagModule,
    NzCardModule,
    NzAffixModule,
    NzGridModule,
    SearchProfileComponent,
  ],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagActions.getPopularTags());
  }

  doSomething(tag: string) {
    this.router.navigate(['/tags', tag], {
      queryParams: {
        tab: tag,
      },
    });
  }
}
