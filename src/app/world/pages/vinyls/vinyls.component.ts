import { Component, OnInit } from '@angular/core';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {Vinyl} from '../../interfaces/vinyl.interface';
import {VinylsService} from '../../services/vinyls/vinyls.service';
import {Router} from '@angular/router';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';
import {MeCopyService} from '../../../copy/services/me-copy/me-copy.service';

@Component({
  selector: 'app-vinyls',
  templateUrl: './vinyls.component.html',
  styles: [
  ]
})
export class VinylsComponent implements OnInit {

  public pageSize = 25;
  public search = '';
  public pagination: Pagination = undefined;

  private _vinyls: Vinyl [] = [];
  get vinyls(): Vinyl[]{
    return [... this._vinyls];
  }

  private _pageSizes: number [] = this.pageSizesService.pageSizes;
  public get pageSizes(): number [] {
    return this._pageSizes;
  }



  constructor( private vinylsService: VinylsService,
               private router: Router,
               private pageSizesService: PageSizesService,
               private meCopyService: MeCopyService) { }

  ngOnInit(): void {
    this.search = this.vinylsService.search;
    this.pageSize = this.vinylsService.pageSize;
    this.pagination = this.vinylsService.pagination;
    if ( this.pagination) {
      this.getVinyls(this.pagination.currentPage);
    } else {
      this.getVinyls();
    }
  }

  getVinyls(page = 1) {
    if (this.search.length < 3){
      this.search =  '';
    }
    this.vinylsService.getAllVinyls(this.pageSize, page, this.search )
      .subscribe((resp: { pagination: Pagination, vinyls: Vinyl [] }) => {
        this.pagination = resp.pagination;
        this._vinyls = resp.vinyls;
        this.pageSize = this.pagination.pageSize;
      });
  }

  goToPage(page) {
    this.getVinyls(page);
  }

  searchVinyls() {
    this.getVinyls();
  }

  changePageSize() {
    this.getVinyls();
  }

  showVinyl(_id: string): void {
    this.vinylsService.search = this.search;
    this.vinylsService.pageSize = this.pageSize;
    this.vinylsService.pagination = this.pagination;
    this.router.navigate(['/world', 'vinyls', 'view', _id]).then();
  }

  newVinyl(): void {
    this.vinylsService.search = this.search;
    this.vinylsService.pageSize = this.pageSize;
    this.vinylsService.pagination = this.pagination;
    this.router.navigate(['/world', 'vinyls', 'new']).then();
  }


  addCopy( vinylId: string ) {
    this.meCopyService.addCopy( vinylId ).subscribe();
  }

}
