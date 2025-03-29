
import { Component, Input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'app-loader',
    imports: [MatProgressBar],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
    standalone:true
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() mode:'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';
  @Input() value: number;
}
