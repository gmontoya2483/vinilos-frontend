import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styles: [
  ]
})
export class UserProfileDetailsComponent implements OnInit {

  @Input() user: User =  null;

  constructor() { }

  ngOnInit(): void {
  }

}
