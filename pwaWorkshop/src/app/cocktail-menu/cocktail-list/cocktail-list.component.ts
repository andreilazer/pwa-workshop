import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
  @Input() cocktails: any[] = [];
  @Input() title: string = 'Cocktails'

  pageSizeOptions: number[] = [5, 10, 25, 100];
  currentPage: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.paginate({ pageIndex: 0, pageSize: 5, length: this.cocktails.length });
  }

  paginate(page: PageEvent) {
    console.log(page);
    this.currentPage = this.cocktails.slice((page.pageIndex) * page.pageSize, (page.pageIndex+1) * 5);
  }
}
