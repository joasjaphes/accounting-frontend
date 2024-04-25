import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressBar,NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() mode:'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';
  @Input() value: number;
}
