import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  searchString: string = 'kendric';
  searchResults: any;
  searchCalled: boolean = false;
  device: string = 'web';
  hideSearchInput: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.handleDeviceChange(window.innerWidth);
    this.search();
  }

  search(): void {
    this.searchCalled = true;
    let url = `${environment.deezerBaseUrl}/search/artist/?q=${this.searchString}&index=0&output=json`; // No Limit. If needed add "&limit=3"
    this.api.genericGet(url).subscribe((res: any) => this.searchResults = res);
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

}
