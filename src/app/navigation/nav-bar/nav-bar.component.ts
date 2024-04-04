import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { navBarOptions } from '../options/nav-options';
import { NavigationService } from '../navigation.service';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public test = 'hey dude';

  public options = navBarOptions;

  public searchResults: Article[] = [];

  public searchInput = '';

  private subs = new Subscription();

  constructor(private router: Router, private readonly navigationService: NavigationService) { }

  public ngOnInit(): void {/* */}

  public ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  public updateSearch(input: Event): void {
    const searchResultsHidden = document.querySelector('.search-results-hidden');
    if (searchResultsHidden !== null) {
      searchResultsHidden.setAttribute('class', 'search-results');
    }
    const value = (input.target as HTMLInputElement).value;
    if (value !== '') {
      this.searchResults = [];
      this.subs.add(
        this.navigationService.search(value).subscribe((resultados: Article[]) => {
          this.searchResults = resultados;
        })
      );
    } else {
      this.searchResults = [];
    }
  }

  public navigateTo(author: string, id?: string): void {
    void this.router.navigate([`articles/${author}/${id}`]);
  }

  public hideResults(): void {
    document.querySelector('.search-results')?.setAttribute('class', 'search-results-hidden');
  }

}
