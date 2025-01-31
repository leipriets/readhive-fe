import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {combineLatest} from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import {articleActions} from '../../store/actions';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {DrawerComponent} from '../../../../library/components/drawer/drawer.component';
import { EditArticleComponent } from '../editArticle/editArticle.component';

@Component({
  selector: 'app-article-slug',
  templateUrl: './articleSlug.component.html',
  styleUrls: ['./articleSlug.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    NzAvatarModule,
    NzButtonModule,
    NzDropDownModule,
    NzGridModule,
    NzIconModule,
    NzNoAnimationModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTagModule,
    NzTypographyModule,
    DrawerComponent,
    EditArticleComponent
  ]
})
export class ArticleSlugComponent implements OnInit {
  @ViewChild(DrawerComponent, {static: false}) drawerTemplate!: DrawerComponent;

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));
  } 

  openDrawerComponent() {
    this.drawerTemplate.toggleDrawer();
  }
}
