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
  searchCalled: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.searchCalled = true;
    let url = `${environment.deezerBaseUrl}/search/artist/?q=${this.searchString}&index=0&output=json`; // No Limit. If needed add "&limit=3"
    this.api.genericGet(url).subscribe((res: any) => this.searchResults = res);
  }
}
