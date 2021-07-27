import { Component, OnInit } from '@angular/core';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {Vinyl} from '../../../world/interfaces/vinyl.interface';
import {Router} from '@angular/router';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';
import {MeCommunityCopyService} from '../../../copy/services/me-community-copy/me-community-copy.service';
import {Copy} from '../../../copy/interfaces/copy.interface';

@Component({
  selector: 'app-comunidad-vinyls',
  templateUrl: './comunidad-vinyls.component.html',
  styles: [
  ]
})
export class ComunidadVinylsComponent implements OnInit {

  public pageSize = 25;
  public search = '';
  public pagination: Pagination = undefined;

  private _copies: Copy [] = [];
  get copies(): Copy[]{
    return [... this._copies];
  }

  private _pageSizes: number [] = this.pageSizesService.pageSizes;
  public get pageSizes(): number [] {
    return this._pageSizes;
  }

  constructor(private router: Router,
              private pageSizesService: PageSizesService,
              private meCommunityCopyService: MeCommunityCopyService
  ) { }

  ngOnInit(): void {
    this.search = this.meCommunityCopyService.search;
    this.pageSize = this.meCommunityCopyService.pageSize;
    this.pagination = this.meCommunityCopyService.pagination;
    if ( this.pagination) {
      this.getCopies(this.pagination.currentPage);
    } else {
      this.getCopies();
    }
  }

  getCopies(page = 1) {
    if (this.search.length < 3){
      this.search =  '';
    }
    this.meCommunityCopyService.getAllMyCommunityCopies(this.pageSize, page, this.search )
      .subscribe((resp: { pagination: Pagination, copies: Copy [] }) => {
        this.pagination = resp.pagination;
        this._copies = resp.copies;
        this.pageSize = this.pagination.pageSize;
      });

  }

  goToPage(page) {
    this.getCopies(page);
  }

  searchBooks() {
    this.getCopies();
  }

  changePageSize() {
    this.getCopies();
  }

  showCopy(communityId: string, copyId: string, vinylId: string): void {
    this.meCommunityCopyService.search = this.search;
    this.meCommunityCopyService.pageSize = this.pageSize;
    this.meCommunityCopyService.pagination = this.pagination;
    this.router.navigate(['/world', 'communities', communityId, 'copies', 'view', copyId, 'vinyls', vinylId]).then();
    console.log(`Ir a Copia: ${copyId}`);

  }

  addCopy(_id: string) {
    console.log(`Add Copia: ${_id}`);

  }

}
