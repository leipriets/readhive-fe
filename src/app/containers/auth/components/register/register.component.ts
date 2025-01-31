import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
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
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import { authActions } from '../../store/actions';
import { Observable, Observer } from 'rxjs';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzCardModule,
    HeaderComponent,
  ],
  standalone: true,
})
export class RegisterComponent {
  validateForm = this.formBuilder.group(
    {
      username: ['', Validators.required],
      remember: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    },
    {validator: this.confirmValidator}
  );

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  confirmValidator(group: FormGroup): ValidationErrors | null | void {

    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!group.value) {
      return { error: true, required: true };
    }

    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({mismatch: true});
    } else {
      return null;
    }
  }

  userNameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  submitForm() {
    const request: RegisterRequestInterface = {
      user: this.validateForm.getRawValue(),    
    };

    this.store.dispatch(authActions.register({request}));
  }
}
