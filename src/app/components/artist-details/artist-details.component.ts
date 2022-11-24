import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnChanges {
  @Input() artist: any;
  device: string = 'web';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor() {
    this.handleDeviceChange(window.innerWidth);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['artist']) {
      this.artist = changes['artist'].currentValue;
    };
  }

  formatFanTotal(n: number): any {
    // This will return
    // 100 if n <= 999
    // 1k if n >= 1,000
    // 1m if n >= 1,000,000
    // 1b if n >= 1,000,000,000
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }
}
