import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {
  catchError,
  debounceTime,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import {SearchProfileInterface} from '../types/searchProfile.interface';
import {SearchProfileService} from '../services/searchProfile.service';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-search-profile',
  templateUrl: './searchProfile.component.html',
  styleUrl: './searchProfile.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzInputModule,
    NzAutocompleteModule,
    NzSkeletonModule,
  ],
})
export class SearchProfileComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  options: SearchProfileInterface[] = [];
  inputValue?: string;
  searchingProfile = false;

  constructor(
    private searchService: SearchProfileService,
    private router: Router
  ) {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((value) =>
          value.trim()
            ? this.searchService.getUserProfile(value).pipe(
                catchError(() => of([])) // handle error and return empty array
              )
            : of([])
        )
      )
      .subscribe((results) => {
        this.options = results;
        this.searchingProfile = false;
      });
  }

  ngOnInit(): void {}

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchingProfile = true;
    this.searchSubject.next(value);
  }

  onSelect(): void {
    if (this.inputValue) {
      this.router.navigate([`/profile/${this.inputValue}`], {
        queryParams: {tab: 'posts'},
      });
    }
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
