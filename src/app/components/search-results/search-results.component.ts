import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnChanges {
  @Input() searchString: string = '';
  @Input() searchResults: any;
  device: string = 'web';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor() {
    this.handleDeviceChange(window.innerWidth);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResults']) {
      this.searchResults = changes['searchResults'].currentValue;
    };
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

}
