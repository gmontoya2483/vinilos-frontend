import {Component, Input, OnInit} from '@angular/core';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {Copy} from '../../../copy/interfaces/copy.interface';
import {Router} from '@angular/router';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';
import {UserCopyService} from '../../../copy/services/user-copy/user-copy.service';

@Component({
  selector: 'app-user-profile-copies',
  templateUrl: './user-profile-copies.component.html',
  styles: [
  ]
})
export class UserProfileCopiesComponent implements OnInit {

  @Input() userId: string = null;
  @Input() followingId: string = null;
  @Input()  followerId: string = null;

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
              private userCopyService: UserCopyService) { }

  ngOnInit(): void {
    this.search = this.userCopyService.search;
    this.pageSize = this.userCopyService.pageSize;
    this.pagination = this.userCopyService.pagination;
    if ( this.pagination) {
      this.getCopies(this.pagination.currentPage);
    } else {
      this.getCopies();
    }
  }

  getCopies(page = 1) {

    let idToSearch: string = null;

    if (this.search.length < 3){
      this.search =  '';
    }

    if (this.userId) { idToSearch = this.userId; }
    if (this.followingId) { idToSearch = this.followingId; }
    if (this.followerId) { idToSearch = this.followerId; }


    if (idToSearch) {
      this.userCopyService.getAllUserCopies(idToSearch, this.pageSize, page, this.search )
        .subscribe((resp: { pagination: Pagination, copies: Copy [] }) => {
          this.pagination = resp.pagination;
          this._copies = resp.copies;
          this.pageSize = this.pagination.pageSize;
        });
    }
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

  showCopy( copyId: string, vinylId: string): void {
    this.userCopyService.search = this.search;
    this.userCopyService.pageSize = this.pageSize;
    this.userCopyService.pagination = this.pagination;

    if (this.userId) {
      this.router.navigate(['/world', 'users', this.userId, 'copies', 'view', copyId, 'vinyls', vinylId]).then();
    }

    if (this.followingId) {
      this.router.navigate(['/world', 'following', this.followingId, 'copies', 'view', copyId, 'vinyls', vinylId]).then();
    }

    if (this.followerId) {
      this.router.navigate(['/world', 'follower', this.followerId, 'copies', 'view', copyId, 'vinyls', vinylId]).then();
    }
  }


}
