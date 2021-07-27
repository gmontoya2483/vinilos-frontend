import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile-photo',
  templateUrl: './user-profile-photo.component.html',
  styles: [
  ]
})
export class UserProfilePhotoComponent implements OnInit {

  @Input() img: string = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
