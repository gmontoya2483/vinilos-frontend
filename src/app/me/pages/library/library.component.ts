import { Component, OnInit } from '@angular/core';
import {MeService} from '../../services/me/me.service';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {Vinyl} from '../../../world/interfaces/vinyl.interface';
import {Router} from '@angular/router';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';
import {MeCopyService} from '../../../copy/services/me-copy/me-copy.service';
import {Copy} from '../../../copy/interfaces/copy.interface';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styles: [
  ]
})
export class LibraryComponent implements OnInit {

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




  constructor(public meService: MeService,
              private router: Router,
              private pageSizesService: PageSizesService,
              private meCopyService: MeCopyService) {
    this.meService.getMe().subscribe((resp: any ) => {  });
  }

  ngOnInit(): void {
    this.search = this.meCopyService.search;
    this.pageSize = this.meCopyService.pageSize;
    this.pagination = this.meCopyService.pagination;
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
    this.meCopyService.getAllMyCopies(this.pageSize, page, this.search )
      .subscribe((resp: { pagination: Pagination, copies: Copy [] }) => {
        this.pagination = resp.pagination;
        this._copies = resp.copies;
        this.pageSize = this.pagination.pageSize;
      });
  }

  goToPage(page) {
    this.getCopies(page);
  }

  searchVinyls() {
    this.getCopies();
  }

  changePageSize() {
    this.getCopies();
  }

  showCopy( copyId: string, vinylId: string): void {
    this.meCopyService.search = this.search;
    this.meCopyService.pageSize = this.pageSize;
    this.meCopyService.pagination = this.pagination;
    this.router.navigate(['/world', 'copies', 'view', copyId, 'vinyls', vinylId]).then();
  }


  addCopy(_id: string) {
    console.log(`Add Copia: ${_id}`);

  }
}
