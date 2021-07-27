import { Component, OnInit } from '@angular/core';
import {MeService} from '../../../me/services/me/me.service';
import Swal from 'sweetalert2';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {PageSizesService} from '../../../shared/services/page-sizes/page-sizes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-amigos-follower',
  templateUrl: './amigos-follower.component.html',
  styles: [
  ]
})
export class AmigosFollowerComponent implements OnInit {


  public pageSize = 25;
  public search = '';
  public pagination: Pagination = undefined;

  public followers: any[] = null; // TODO: (TRSCL-150) Agregar interface followers para usar como tipo de data

  constructor(private meService: MeService,
              private pageSizesService: PageSizesService,
              private router: Router) {
    this.getFollowers();
  }

  private _pageSizes: number [] = this.pageSizesService.pageSizes;
  public get pageSizes(): number [] {
    return this._pageSizes;
  }

  ngOnInit(): void {
  }

  getFollowers(page = 1) {

    this.meService.getFollowers(this.pageSize, page )
      .subscribe((resp: { pagination: any, followers: [] }) => {
        this.pagination = resp.pagination;
        this.followers = resp.followers;
        this.pageSize = this.pagination.pageSize;
      });
  }



  confirmFollower(user: any, i: number) {

    this.meService.confirmFollower(user.follower).subscribe(( resp: any ) => {
      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const follow = resp.follower;

      if (this.followers[i].follower._id === follow.follower._id){
        this.followers[i].isConfirmed = follow.isConfirmed;
      }
    });



  }

  deleteFollower(user: any, i: number) {

    this.meService.deleteFollower( user.follower ).subscribe( (resp: any) => {
      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const follow = resp.follower;


      if (this.followers[i].follower._id === follow.follower._id){
        this.followers[i].isConfirmed = null;
      }

    });

  }

  followUser(user: any, i: number) {
    this.meService.followUser(user.follower).subscribe(( resp: any ) => {
      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const follow = resp.follow;


      if (this.followers[i].follower._id === follow.following){
        this.followers[i].following = follow;
      }

    });

  }

  unFollowUser(user: any, i: number) {

    this.meService.unFollowUser(user.follower).subscribe((resp: any) => {
      if (!resp.ok){
        Swal.fire({
          title: 'Error',
          text: `${ resp.mensaje }`,
          icon: 'error'
        }).then();
      }

      const following = resp.following.following;

      if (this.followers[i].follower._id === following._id){
        this.followers[i].following = null;
      }

    });

  }


  /*********************************************
   * Funciones para manejar la paginación       *
   *********************************************/

  changePageSize() {
    this.getFollowers();
  }

  goToPage(page: number) {
    this.getFollowers(page);
  }


  showUser(userId: string) {
    console.log(`Te sigue  -> ${userId}`);
    this.router.navigate(['/users', 'follower', userId]).then();

    /*
        this.bookService.search = this.search;
    this.bookService.pageSize = this.pageSize;
    this.bookService.pagination = this.pagination;
    this.router.navigate(['/world', 'vinyls', 'view', _id]).then();
    // console.log(`Ir al Libro: ${_id}`);
    */

  }


}
