import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzAlertModule} from 'ng-zorro-antd/alert';

import {HeaderComponent} from '../../../../library/components/header/header.component';
import {Router, RouterLink} from '@angular/router';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {select, Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {
  selectCurrentUser,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import {combineLatest, filter, Subscription, tap} from 'rxjs';
import {PersistenceService} from '../../../../library/data/services/persitence.service';
import {CommonModule} from '@angular/common';
import {CurrentUserInterface} from '../../../../library/data/types/currentUser.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LeftSectionComponent } from '../leftSection/leftSection.component';
import { DecorComponent } from '../decor/decor.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzCardModule,
    NzAlertModule,
    NzGridModule,
    HeaderComponent,
    CommonModule,
    LeftSectionComponent,
    DecorComponent
  ],
})
export class LoginComponent implements OnInit, OnDestroy {

  isSubmitting$ = this.store.select(selectIsSubmitting);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    validationErrors: this.store.select(selectValidationErrors),
  });

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    // remember: [''],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.persistenceService.get('BVaccessToken');

    this.form.patchValue({
      email: 'johndoe@yopmail.com',
      password: 'password@123'
    })

    if (token) {
      this.router.navigateByUrl('/');
    }
  }


  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.login({request}));
  }

  ngOnDestroy(): void {}
}
