import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest} from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../../containers/article/store/reducers';
import {Store} from '@ngrx/store';
import {ArticleFormValuesInterface} from '../../data/types/articleFormValues.interface';
import {ArticleRequestInterface} from '../../data/types/articleRequest.interface';
import {articleActions} from '../../../containers/article/store/actions';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {BackendErrorInterface} from '../../data/types/backendError.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { BackendErrorMessages } from '../backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    BackendErrorMessages
  ],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
        ...formValue,
        tagList: formValue.tagList.split(' ')
    }

    this.articleSubmit.emit(articleFormValues);
  }

  
}
