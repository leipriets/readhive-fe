import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';

import {addToFavoritesActions} from './store/actions';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  styleUrls: ['./addToFavorites.component.css'],
  standalone: true,
  imports: [CommonModule, NzIconModule, NzButtonModule],
})
export class AddToFavoritesComponent implements OnInit {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log(this.isFavorited);
  }

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }

    this.isFavorited = !this.isFavorited;
    console.log(this.isFavorited);
  }
}
