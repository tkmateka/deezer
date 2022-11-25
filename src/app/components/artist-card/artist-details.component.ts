import { Component, HostListener, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnChanges {
  @Input() artist: any;
  @Output() cardArtist = new EventEmitter<any>();
  device: string = 'web';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor(public commonService: CommonService) {
    this.handleDeviceChange(window.innerWidth);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['artist']) {
      this.artist = changes['artist'].currentValue;
    };
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

  clickedCard(artist: any): void {
    this.cardArtist.emit(artist);
  }
}
