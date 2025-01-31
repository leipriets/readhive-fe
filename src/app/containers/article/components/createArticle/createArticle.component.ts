import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {combineLatest} from 'rxjs';

import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {ArticleFormValuesInterface} from '../../../../library/data/types/articleFormValues.interface';
import {ArticleRequestInterface} from '../../../../library/data/types/articleRequest.interface';
import {articleActions} from '../../store/actions';
import { ArticleFormComponent } from '../../../../library/components/articleForm/articleForm.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzSelectModule,
    ArticleFormComponent
  ],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(articleActions.createArticle({request}));
  }
}
