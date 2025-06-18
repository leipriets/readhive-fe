import {Component, OnInit} from '@angular/core';

import {NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzAlertModule} from 'ng-zorro-antd/alert';

import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from '../../../library/data/types/currentUser.interface';
import {combineLatest, filter, Observable, Observer, Subscription} from 'rxjs';
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers';
import {selectCurrentUser} from '../../auth/store/reducers';
import {CommonModule} from '@angular/common';
import {BackendErrorMessages} from '../../../library/components/backendErrorMessages/backendErrorMessages.component';
import {CurrentUserRequestInterface} from '../../../library/data/types/currentUserRequest.interface';
import {authActions} from '../../auth/store/actions';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzImageModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzGridModule,
    NzUploadModule,
    NzAlertModule,
    BackendErrorMessages,
  ],
})
export class SettingsComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  fileList: NzUploadFile[] = [];
  filenameImg = '';
  fakeUploadAction = `${environment.apiUrl}/user-update-action`;

  uploadHeaders = {
    'Access-Control-Allow-Origin': '*',
  };

  form = this.fb.nonNullable.group({
    image: null as unknown as Blob,
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  currentUserSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;

        if (this.currentUser.image !== '') {
          this.avatarUrl = this.currentUser.image;
        }

        this.initializeForm();
      });
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    this.form.patchValue({
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(
      authActions.updateCurrentUser({
        currentUserRequest,
        filename: this.filenameImg,
      })
    );
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  /** File Upload */

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      // this.fileList = this.fileList.concat(file);
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
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback((this.avatarUrl = reader.result!.toString()))
    );
    reader.readAsDataURL(img);
  }

  handleChange(info: {file: NzUploadFile}): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.form.patchValue({
          image: info.file!.originFileObj!,
        });

        this.filenameImg = this.getFilenameWithoutExtension(info.file!.name);

        this.getBase64(info.file!.originFileObj!, (img: string) => {});

        break;
      case 'error':
        this.messageService.error('Network error');
        this.loading = false;
        break;
    }
  }

  private getFilenameWithoutExtension(filename: string): string {
    if (!filename) return '';
    const parts = filename.split('.');
    parts.pop(); // remove the extension
    return parts.join('.');
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
