import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {
  spinner: boolean = false;
  device: string = 'web';
  artist: any;
  tracklist: any;
  topFiveTracks: any[] = [];
  albums: any[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  constructor(private api: ApiService, public commonService: CommonService, private location: Location) {
    this.handleDeviceChange(window.innerWidth);
    this.artist = JSON.parse(sessionStorage.getItem('selectedArtist') || '{}');
  }

  ngOnInit(): void {
    this.getTrackList();
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }

  getTrackList(): void {
    this.spinner = true;
    this.api.genericGet(this.artist.tracklist).subscribe((res: any) => {
      this.tracklist = res;
      // Grab the top 5 tracks
      this.topFiveTracks = this.tracklist.data.slice(0, 5);
      // Get Album for each track
      this.topFiveTracks.forEach((item: any) => this.getAlbums(item.album.id));
      this.spinner = false;
    }, (err: any) => {
      this.spinner = false;
    });
  }

  getAlbums(id: number): void {
    this.spinner = true;
    this.api.genericGet(`${environment.deezerBaseUrl}/album/${id}`)
      .subscribe(
        (res: any) => {
          this.spinner = false;
          if (!res.error) {
            this.albums.push(res);
          }
        },
        (err: any) => {
          this.spinner = false;
          console.log(err);
        }
      )
  }

  goBack(): void {
    this.location.back();
  }
}
