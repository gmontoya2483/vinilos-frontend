import { Component, OnInit } from '@angular/core';
import {MeService} from '../../../me/services/me/me.service';
import Swal from 'sweetalert2';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comunidad-users',
  templateUrl: './comunidad-users.component.html',
  styles: [
  ]
})



export class ComunidadUsersComponent implements OnInit {

  private _pageSizes: number [] = this.pageSizesService.pageSizes;
  public get pageSizes(): number [] {
    return this._pageSizes;
  }

  public pageSize = 25;
  public search = '';
  public pagination: Pagination = undefined;
  public members: any [] = null; // TODO: (TRSCL-148) Agregar la intenface members



  constructor(private meService: MeService,
              private pageSizesService: PageSizesService,
              private router: Router
              ) {
    this.getMembers();
  }

  ngOnInit(): void {
  }


  goToPage(page) {
    this.getMembers(page);
  }

  searchMember() {
    this.getMembers();
  }

  changePageSize() {
    this.getMembers();
  }


  getMembers(page = 1) {
    if (this.search.length < 3){
      this.search =  '';
    }
    this.meService.getMyCommunityMembers(this.pageSize, page, this.search )
      .subscribe((resp: { pagination: any, users: [] }) => {
        this.pagination = resp.pagination;
        this.members = resp.users;
        this.pageSize = this.pagination.pageSize;
      });
  }

  followUser(user: any, i: number) {

    this.meService.followUser(user).subscribe(( resp: any ) => {
      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const follow = resp.follow;

      // @ts-ignore
      if (this.members[i]._id === follow.following){
        // @ts-ignore
        this.members[i].following = {_id: follow._id, isConfirmed: follow.isConfirmed};
      }

    });
  }

  unFollowUser(user: any, i: number) {

    this.meService.unFollowUser(user).subscribe((resp: any) => {
      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const following = resp.following.following;

      // @ts-ignore
      if (this.members[i]._id === following._id){
        // @ts-ignore
        this.members[i].following = null;
      }

    });

  }


  confirmfollower(user: any, i: number) {
    this.meService.confirmFollower(user).subscribe(( resp: any ) => {

      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const follow = resp.follower;

      if (this.members[i]._id === follow.follower._id){
        this.members[i].follower = {_id: follow._id, isConfirmed: follow.isConfirmed};
       }
    });


  }

  deleteFollower(user: any, i: number) {

    this.meService.deleteFollower( user ).subscribe( (resp: any) => {

      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const follow = resp.follower;

      // @ts-ignore
      if (this.members[i]._id === follow.follower._id){
        // @ts-ignore
        this.members[i].follower = null;
      }

    });

  }

  showUser(userId: string) {
    console.log(`Usuario  -> ${userId}`);
    this.router.navigate(['/users', 'profile', userId]).then();

    /*
        this.bookService.search = this.search;
    this.bookService.pageSize = this.pageSize;
    this.bookService.pagination = this.pagination;
    this.router.navigate(['/world', 'vinyls', 'view', _id]).then();
    // console.log(`Ir al Libro: ${_id}`);
    */
  }

}
