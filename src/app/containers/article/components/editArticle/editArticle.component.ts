import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {ArticleFormComponent} from '../../../../library/components/articleForm/articleForm.component';
import { CommentComponent } from '../../../../library/components/comments/comments.component';
import {CommonModule} from '@angular/common';
import {articleActions} from '../../store/actions';
import {combineLatest, filter, map, Observable} from 'rxjs';
import {
    selectArticleData,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { ArticleFormValuesInterface } from '../../../../library/data/types/articleFormValues.interface';
import { ArticleInterface } from '../../../../library/data/types/article.interface';
import { ArticleRequestInterface } from '../../../../library/data/types/articleRequest.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './editArticle.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticleData),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        images: article.article_media
      };
    })
  );

  slug = this.router.snapshot.paramMap.get('slug') ?? '';

  constructor(private store: Store, private router: ActivatedRoute) {}

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));
    console.log(this.slug);
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(
        articleActions.updateArticle({request, slug: this.slug})
    );
  }
}
