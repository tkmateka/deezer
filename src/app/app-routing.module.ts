import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistViewComponent } from './components/artist-details/artist-view.component';
import { BaseComponent } from './components/base/base.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: '', redirectTo: '/deezer', pathMatch: 'full' },
  {
    path: 'deezer', component: BaseComponent, children: [
      { path: 'search-for/:name', component: SearchResultsComponent },
      { path: 'artist-view', component: ArtistViewComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
