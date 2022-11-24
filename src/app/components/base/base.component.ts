import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  searchString: string = '';
  searchResults: any;
  searchCalled: boolean = false;
  device: string = 'web';
  hideSearchInput: boolean = true;
  spinner: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  @ViewChild('mainContainer', { static: false }) mainContainer!: ElementRef;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.handleDeviceChange(window.innerWidth);
  }

  search(): void {
    let url = `${environment.deezerBaseUrl}/search/artist/?q=${this.searchString}&index=0&output=json`; // No Limit. If needed add "&limit=3"
    this.getData(url);
  }

  getData(url: string) {
    this.spinner = true;
    this.api.genericGet(url).subscribe((res: any) => {
      this.searchCalled = true;
      this.searchResults = res;
      this.spinner = false;
    }, (err: any) => {
      console.log("Error", err);
      this.spinner = false;
    });

    if (this.mainContainer) {
      this.mainContainer.nativeElement.scrollTop = 0;
    }
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

}
