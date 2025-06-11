import {Component, inject, Input, OnInit} from '@angular/core';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';

import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {ArticleInterface} from '../../data/types/article.interface';
import {environment} from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CommentComponent } from '../comments/comments.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddToFavoritesComponent } from '../addToFavorites/addToFavorites.component';

interface IModelArticleData {
    articleData: ArticleInterface,
    isDirectComment: boolean
}

@Component({
  selector: 'app-article-slug-modal',
  templateUrl: './articleSlugModal.component.html',
  styleUrl: './articleSlugModal.component.css',
  standalone: true,
  imports: [
    CommonModule,
    NzTypographyModule,
    NzSpaceModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzAvatarModule,
    NzTagModule,
    NzGridModule,
    NzCardModule,
    NzImageModule,
    NzIconModule,
    AddToFavoritesComponent,
    CommentComponent
  ],
})
export class ArticleSlugModalComponent implements OnInit {

  readonly nzModalData: IModelArticleData = inject(NZ_MODAL_DATA);

  pathUrl = environment.apiPath;
  avatarUrl = '';

  ngOnInit(): void {
    this.avatarUrl = this.nzModalData.articleData.author.image;

  }
}
