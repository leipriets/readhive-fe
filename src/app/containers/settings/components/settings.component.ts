import {Component, OnInit} from '@angular/core';

import {NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import { CurrentUserInterface } from '../../../library/data/types/currentUser.interface';
import { combineLatest, filter, Subscription } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { selectCurrentUser } from '../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from '../../../library/components/backendErrorMessages/backendErrorMessages.component';
import { CurrentUserRequestInterface } from '../../../library/data/types/currentUserRequest.interface';
import { authActions } from '../../auth/store/actions';

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
    NzBreadCrumbModule,
    NzIconModule,
    NzGridModule,
    BackendErrorMessages
  ],
})
export class SettingsComponent implements OnInit{
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  });

  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.pipe(
        select(selectCurrentUser),
        filter(Boolean)
    ).subscribe(currentUser => {
        this.currentUser = currentUser;
        this.initializeForm();
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
}

  initializeForm(): void {
    if (!this.currentUser) {
        throw new Error('current user is not set');
    }
    this.form.patchValue({
        image: this.currentUser.image ?? '',
        username: this.currentUser.username,
        bio: this.currentUser.bio ?? '',
        email: this.currentUser.email,
        password: ''
    })
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
    }

    console.log(currentUserRequest);

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}));
  }
}
