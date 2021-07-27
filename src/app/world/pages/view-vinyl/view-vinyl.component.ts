import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vinyl} from '../../interfaces/vinyl.interface';
import {VinylsService} from '../../services/vinyls/vinyls.service';
import {MeCopyService} from '../../../copy/services/me-copy/me-copy.service';

@Component({
  selector: 'app-view-vinyl',
  templateUrl: './view-vinyl.component.html',
  styles: [
  ]
})
export class ViewVinylComponent implements OnInit {

  vinyl: Vinyl;
  private vinylId: string;
  private authorId: string;
  private copyId: string;
  private communityId: string;
  private userId: string;
  private followingId: string;
  private followerId: string;

  constructor(private router: Router,
              private vinylsService: VinylsService,
              private activatedRoute: ActivatedRoute,
              private meCopyService: MeCopyService) { }

  ngOnInit(): void {
    this.vinylId = this.activatedRoute.snapshot.paramMap.get('vinylId');
    this.authorId = this.activatedRoute.snapshot.paramMap.get('authorId');
    this.copyId = this.activatedRoute.snapshot.paramMap.get('copyId');
    this.communityId = this.activatedRoute.snapshot.paramMap.get('communityId');
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.followingId = this.activatedRoute.snapshot.paramMap.get('followingId');
    this.followerId = this.activatedRoute.snapshot.paramMap.get('followerId');
    this.getVinyl();
  }


  back() {
    if (this.authorId){
      return this.router.navigate(['/world', 'authors', 'view', this.authorId]).then();
    }

    if (this.userId) {
      return this.router.navigate(['/users', 'profile', this.userId]).then();
    }

    if (this.followingId) {
      return this.router.navigate(['/users', 'following', this.followingId]).then();
    }

    if (this.followerId) {
      return this.router.navigate(['/users', 'follower', this.followerId]).then();
    }

    if (this.copyId && !this.communityId){
      return this.router.navigate(['/me', 'library']).then();
    }

    if (this.communityId){
      return this.router.navigate(['/comunidad', 'vinyls']).then();
    }

    return this.router.navigate(['/world', 'vinyls']).then();
  }

  private getVinyl() {
    this.vinylsService.getSingleVinyl(this.vinylId).subscribe(
      (resp: Vinyl) => {
        this.vinyl = resp;
      }
    );

  }


  addCopy( bookId: string ) {
    this.meCopyService.addCopy( bookId ).subscribe();
  }
}
