import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.scss']
})
export class TopFiveComponent implements OnChanges {
  @Input() topFiveTracks: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topFiveTracks']) {
      this.topFiveTracks = changes['topFiveTracks'].currentValue;
    }
  }

  handleDuration(duration: number): any {
    let minutesInNumber = Math.floor(duration / 60);
    let minutes = (minutesInNumber < 10) ? `0${minutesInNumber}` : minutesInNumber;
    let seconds = ((duration - minutesInNumber * 60) < 10) ? `0${(duration - minutesInNumber * 60)}` : (duration - minutesInNumber * 60);

    return `${minutes}:${seconds}`
  }

}
