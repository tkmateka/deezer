import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  searchString: string = '';
  device: string = 'web';
  hideSearchInput: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleDeviceChange(event.target.innerWidth);
  }

  @ViewChild('mainContainer', { static: false }) mainContainer!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.handleDeviceChange(window.innerWidth);
  }

  search(): void {
    this.router.navigate([`/deezer/search-for/${this.searchString}`])
  }

  handleDeviceChange(width: number): void {
    this.device = (width <= 600) ? 'mobile' : (width > 600 && width < 900) ? 'tablet' : 'web';
  }
}
