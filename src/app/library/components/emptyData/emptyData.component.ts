import { Component } from "@angular/core";

import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
    selector: 'app-empty-data',
    templateUrl: './emptyData.component.html',
    standalone: true,
    imports: [NzEmptyModule]
})
export class EmptyDataComponent {

}