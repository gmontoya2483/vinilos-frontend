import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/users/user.service';
import {User} from '../../interfaces/user.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {

  public userId: string = undefined;
  public followingId: string = undefined;
  public followerId: string = undefined;
  public user: User = null;

  constructor(private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.followingId = this.activatedRoute.snapshot.paramMap.get('followingId');
    this.followerId = this.activatedRoute.snapshot.paramMap.get('followerId');

    if (this.userId) { this.getUser(this.userId); }
    if (this.followingId) { this.getUser(this.followingId); }
    if (this.followerId) { this.getUser(this.followerId); }
  }


  private getUser(userToFindId: string) {
    this.userService.getUserProfile(userToFindId).subscribe(
      (resp: User) => {
        this.user = resp;
      }
    );
  }

  back() {
    if (this.userId) { return this.router.navigate(['/comunidad', 'users']).then(); }
    if (this.followingId) { return this.router.navigate(['/amigos', 'following']).then(); }
    if (this.followerId) { return this.router.navigate(['/amigos', 'followers']).then(); }
  }
}
