import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {getRelativeTime} from '../../utils/helper';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tooltip-date',
  templateUrl: './tooltipDate.component.html',
  styleUrls: ['./tooltipDate.component.css'],
  standalone: true,
  imports: [CommonModule, NzTypographyModule, NzToolTipModule],
})
export class ToolTipDateComponent implements OnInit {
  @Input() createdDate?: string;
  timeDiff = '';

  ngOnInit(): void {
    this.timeDiff = this.getTimeDiff(this.createdDate!);

  }


  getTimeDiff(dateString: string) {
    return getRelativeTime(dateString);
  }
}
