import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {followUserActions} from './store/actions';

@Component({
  selector: 'app-follow-button',
  templateUrl: './followButton.component.html',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
})
export class FollowButtonComponent implements OnInit {
  @Input() isFollowing: boolean | undefined = false;
  @Input() username: string | undefined = '';

  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleFollow() {
    this.store.dispatch(
      followUserActions.followUser({
        isFollowing: this.isFollowing,
        username: this.username,
      })
    );

    this.isFollowing = !this.isFollowing;
  }
}
