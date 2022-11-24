import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnChanges {
  @Input() searchResults: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResults']) {
      this.searchResults = changes['searchResults'].currentValue;
    };
  }

}
