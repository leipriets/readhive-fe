import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isDrawerOpen = false;

  toggleDrawer(visible: boolean = this.isDrawerOpen) {
    return (this.isDrawerOpen = !visible);
  }
}
