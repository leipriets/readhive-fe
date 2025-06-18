import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest, Observable, Observer} from 'rxjs';
import { QuillModule } from 'ngx-quill';
import {v4 as uuidv4} from 'uuid';
import {Store} from '@ngrx/store';

import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../../containers/article/store/reducers';
import {ArticleFormValuesInterface} from '../../data/types/articleFormValues.interface';
import {ArticleRequestInterface} from '../../data/types/articleRequest.interface';
import {articleActions} from '../../../containers/article/store/actions';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import {NzModalModule} from 'ng-zorro-antd/modal';

import {BackendErrorInterface} from '../../data/types/backendError.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {BackendErrorMessages} from '../backendErrorMessages/backendErrorMessages.component';
import {popularTagActions} from '../popularTags/store/actions';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from '../popularTags/store/reducers';
import {NzIconModule} from 'ng-zorro-antd/icon';

import {environment} from '../../../../environments/environment.development';
import {FileHelperUtil} from '../../utils/fileHelper.util';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ArticleMedia} from '../../data/types/articleMedia.interface';
import {ArticleFiles} from '../../data/types/articleFiles.interface';


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
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule,
    BackendErrorMessages,
    QuillModule
  ],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  previewImage: string | undefined = '';
  previewVisible = false;
  fakeUploadAction = `${environment.apiUrl}/user-update-action`;
  fileList: NzUploadFile[] = [];
  fileLoading = false;

  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: this.fb.nonNullable.control<string[]>([], Validators.required),
    images: null as unknown as any,
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private fileHelper: FileHelperUtil,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.store.dispatch(popularTagActions.getPopularTags());
  }

  initializeForm(): void {
    // const fileImages = this.initialValues?.images[0].files.map((response: any) => {
    //   const filepath = `${environment.apiPath}/src/images/${response.filename}`;

    //   return {
    //     uid: uuidv4(),
    //     name: response.filename,
    //     size: response.size,
    //     thumbUrl: filepath,
    //     url: filepath,
    //   };
    // });


    // this.fileList = [...JSON.parse(JSON.stringify(fileImages))];
    // this.fileList = [...fileImages];

    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList,
      // images: [...fileImages],
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
    };

    this.articleSubmit.emit(articleFormValues);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.fileHelper.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        this.messageService.error('You can only upload JPG/PNG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }

      // if (this.fileList.length > 3) {
      //   this.messageService.error('You can only upload up to 4 photos.');
      //   observer.complete();
      //   return;
      // }

      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  handleChange(info: NzUploadChangeParam): void {
    this.fileList = [...info.fileList];

    if (info.type === 'removed') {

      this.form.patchValue({
        images: this.fileList,
      });
    }

    if (this.fileList.length > 4) {
      this.messageService.error('You can only upload up to 4 photos.');
      return;
    } else {
      switch (info.file.status) {
        case 'uploading':
          this.fileLoading = true;
          break;
        case 'done':
          this.form.patchValue({
            images: this.fileList,
          });

          this.fileLoading = false;

          break;
        case 'error':
          this.messageService.error('Network error');
          this.fileLoading = false;
          break;
      }
    }
  }
}
