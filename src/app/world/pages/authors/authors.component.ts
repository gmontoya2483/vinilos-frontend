import { Component, OnInit } from '@angular/core';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {Author} from '../../interfaces/author.interface';
import {AuthorsService} from '../../services/authors/authors.service';
import {Route, Router} from '@angular/router';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styles: [
  ]
})
export class AuthorsComponent implements OnInit {

  public pageSize = 25;
  public search = '';
  public pagination: Pagination = undefined;

  private _authors: Author [] = [];

  private _pageSizes: number [] = this.pageSizesService.pageSizes;
  public get pageSizes(): number [] {
    return this._pageSizes;
  }

  get authors(): Author[]{
    return [... this._authors];
  }

  constructor(private authorService: AuthorsService,
              private router: Router,
              private pageSizesService: PageSizesService) {
  }

  ngOnInit(): void {
    this.search = this.authorService.search;
    this.pageSize = this.authorService.pageSize;
    this.pagination = this.authorService.pagination;
    if ( this.pagination) {
      this.getAuthors(this.pagination.currentPage);
    } else {
      this.getAuthors();
    }
  }

  getAuthors(page = 1) {
    if (this.search.length < 3){
      this.search =  '';
    }
    this.authorService.getAllAuthors(this.pageSize, page, this.search )
      .subscribe((resp: { pagination: Pagination, authors: Author [] }) => {
        this.pagination = resp.pagination;
        this._authors = resp.authors;
        this.pageSize = this.pagination.pageSize;
      });
  }


  goToPage(page) {
    this.getAuthors(page);
  }

  searchAuthor() {
    this.getAuthors();
  }

  changePageSize() {
    this.getAuthors();
  }

  showAuthor(_id: string): void {
    console.log(_id);
    this.router.navigate(['/world', 'authors', 'view', _id]).then();
  }

  newAuthor(): void {
    this.authorService.search = this.search;
    this.authorService.pageSize = this.pageSize;
    this.authorService.pagination = this.pagination;
    this.router.navigate(['/world', 'authors', 'new']).then();
  }
}
