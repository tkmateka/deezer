import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {
  spinner: boolean = false;
  device: string = 'web';
  artist: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor(private api: ApiService) {
    this.handleDeviceChange(window.innerWidth);
    this.artist = JSON.parse(sessionStorage.getItem('selectedArtist') || '{}');
  }

  ngOnInit(): void {
    this.api.genericGet(this.artist.tracklist).subscribe((res: any) => {
      console.log(1, res);
      console.log(2, this.artist);
      this.spinner = false;
    }, (err: any) => {
      this.spinner = false;
    });
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

}
