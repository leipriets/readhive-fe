import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {HeaderComponent} from '../../../../library/components/header/header.component';
import {Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {
  map,
  Observable,
  Observer,
  of,
  Subscription,
  switchMap,
  timer,
} from 'rxjs';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {PersistenceService} from '../../../../library/data/services/persitence.service';
import {LeftSectionComponent} from '../leftSection/leftSection.component';
import {DecorComponent} from '../decor/decor.component';
import {AuthService} from '../../../../library/data/services/auth.service';
import {CommonModule} from '@angular/common';
import {NzSpaceModule} from 'ng-zorro-antd/space';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzCardModule,
    NzSpaceModule,
    HeaderComponent,
    LeftSectionComponent,
    DecorComponent,
  ],
  standalone: true,
})
export class RegisterComponent implements OnInit {
  validateForm = this.formBuilder.group(
    {
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.usernameAsyncValidator(this.authService)],
      ],
      remember: [''],
      email: [
        '',
        [Validators.email, Validators.required],
        [this.emailAsyncValidator(this.authService)],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    },
    {validator: [this.confirmValidator]}
  );

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private persistenceService: PersistenceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.persistenceService.get('BVaccessToken');

    if (token) {
      this.router.navigateByUrl('/');
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  confirmValidator(group: FormGroup): ValidationErrors | null | void {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!group.value) {
      return {error: true, required: true};
    }

    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({mismatch: true});
    } else {
      return null;
    }
  }

  usernameAsyncValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return new Observable((observer: Observer<ValidationErrors | null>) => {
        const username = control.value;

        if (!username) {
          observer.next(null);
          observer.complete();
          return;
        }

        const sub: Subscription = timer(500).subscribe(() => {
          authService.validateUsername(username).subscribe({
            next: (res) => {
              if (!res.isAvailable) {
                observer.next({duplicated: true});
              } else {
                observer.next(null);
              }
              observer.complete();
            },
            error: () => {
              observer.next(null);
              observer.complete();
            },
          });
        });

        return () => {
          sub.unsubscribe();
        };
      });
    };
  }

  emailAsyncValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return new Observable((observer: Observer<ValidationErrors | null>) => {
        const email = control.value;

        if (!email) {
          observer.next(null);
          observer.complete();
          return;
        }

        const sub: Subscription = timer(500).subscribe(() => {
          authService.validateEmail(email).subscribe({
            next: (res) => {
              if (!res.isAvailable) {
                observer.next({duplicated: true});
              } else {
                observer.next(null);
              }
              observer.complete();
            },
            error: () => {
              observer.next(null);
              observer.complete();
            },
          });
        });

        return () => {
          sub.unsubscribe();
        };
      });
    };
  }

  submitForm() {
    const request: RegisterRequestInterface = {
      user: this.validateForm.getRawValue(),
    };

    this.store.dispatch(authActions.register({request}));
  }
}
