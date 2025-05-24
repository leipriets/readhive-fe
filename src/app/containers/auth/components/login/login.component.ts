import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import {HeaderComponent} from '../../../../library/components/header/header.component';
import {Router, RouterLink} from '@angular/router';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {selectIsLoading, selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {combineLatest, tap} from 'rxjs';
import {PersistenceService} from '../../../../library/data/services/persitence.service';
import { CommonModule } from '@angular/common';

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
    HeaderComponent,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    isLoading: this.store.select(selectIsLoading),
    validationErrors: this.store.select(selectValidationErrors)
  })

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
    // const token = this.persistenceService.get('BVaccessToken');

    // if (token) {
    //   this.router.navigateByUrl('/');
    // }
  }


  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.login({request}));
  }
}
