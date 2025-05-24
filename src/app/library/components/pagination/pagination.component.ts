import {Component, inject, Input, OnInit} from '@angular/core';

import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {UtilsService} from '../../data/services/utils.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports: [NzPaginationModule],
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 5;
  @Input() currentPage: number = 1;
  @Input() url: string = '';

  pagesCount: number = 1;
  pages: number[] = [];

  router = inject(Router);
  currentRoute: string = '';

  constructor(private utilsService: UtilsService, route: ActivatedRoute) {
    this.currentRoute = this.router.url.split('?')[0];
  }

  ngOnInit(): void {

    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }

  onPageIndexChange($event: any) {
    this.router.navigate([this.currentRoute], {
      queryParams: {page: $event, limit: this.limit},
      queryParamsHandling: 'merge'
    });

    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
