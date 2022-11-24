import { Component, OnInit } from '@angular/core';
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  search(): void {
    let url = `${environment.deezerBaseUrl}/search/artist/?q=${this.searchString}&index=0&limit=2&output=json`;
    this.api.genericGet(url).subscribe((res: any) => this.searchResults = res);
  }
}
