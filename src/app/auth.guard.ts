import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {PersistenceService} from './library/data/services/persitence.service';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from './containers/auth/store/reducers';
import { filter } from 'rxjs';
import { CurrentUserInterface } from './library/data/types/currentUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private persistenceService: PersistenceService,
    private store: Store,
    private router: Router
  ) {}
  canActivate(): boolean {

    let isAuthenticated = false;

    this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        if (currentUser) {
          isAuthenticated = true; 
        }
      });

    if (this.persistenceService.get('BVaccessToken') && isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/sp/login']);
      return false;
    }
  }
}
