import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cocktail-menu',
  templateUrl: './cocktail-menu.component.html',
  styleUrls: ['./cocktail-menu.component.css']
})
export class CocktailMenuComponent implements OnInit {
  categories$!: Observable<any[]>;
  cocktails$!: Observable<any[]>;
  isLoading: boolean = false;
  currentSection = '';
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  getCategories() {
    this.isLoading = true;
    this.categories$ = this.httpClient.get<any>('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
      .pipe(first(),
        map((result: any) => result.drinks.map((a: any) => (
          {
            name: a.strAlcoholic,
            id: a.strAlcoholic.replace(' ', '_')
          }))),
        tap(() => this.isLoading = false));
  }

  getCocktails(category: any) {
    this.isLoading = true;
    this.currentSection = category.name;
    this.cocktails$ = this.httpClient.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${category.id}`)
      .pipe(first(),
        map(result => result.drinks),
        tap(() => this.isLoading = false));
  }
}
