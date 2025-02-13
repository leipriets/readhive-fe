import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {HeaderComponent} from '../../../../library/components/header/header.component';
import {Router, RouterLink} from '@angular/router';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {selectCurrentUser} from '../../store/reducers';
import {tap} from 'rxjs';
import {PersistenceService} from '../../../../library/data/services/persitence.service';

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
    HeaderComponent,
  ],
})
export class LoginComponent implements OnInit {
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
}
