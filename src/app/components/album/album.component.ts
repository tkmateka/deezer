import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnChanges {
  @Input() album!: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['album']) {
      this.album = changes['album'].currentValue;
      console.log(this.album);
    }
  }

}
