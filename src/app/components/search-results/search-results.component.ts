import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchString: string = '';
  searchResults: any;
  device: string = 'web';
  spinner: boolean = false;
  searchCalled: boolean = false;
  private subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor(private api: ApiService, private router: Router, private BaseComponent: BaseComponent) {
    // Subscribe to route changes
    this.subscription = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(x => this.routeChanged())


    this.handleDeviceChange(window.innerWidth);
  }


  ngOnInit(): void {
    this.routeChanged();
  }

  routeChanged() {
    let split = this.router.url.split('/');
    this.searchString = split[split.length - 1];
    let url = `${environment.deezerBaseUrl}/search/artist/?q=${this.searchString}&index=0&limit=20&output=json`; // No Limit. If needed add "&limit=3"
    this.getData(url);
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

  handleCardArtist(artist: any): void {
    sessionStorage.setItem('selectedArtist', JSON.stringify(artist));
    this.router.navigate(['/deezer/artist-view']);
  }

  getData(url: string) {
    this.spinner = true;

    // Scroll to the top
    if (this.BaseComponent.mainContainer) {
      this.BaseComponent.mainContainer.nativeElement.scrollTop = 0;
    }

    this.searchResults = {};
    this.api.genericGet(url).subscribe((res: any) => {
      this.searchCalled = true;
      this.searchResults = res;
      this.spinner = false;
    }, (err: any) => {
      this.spinner = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
