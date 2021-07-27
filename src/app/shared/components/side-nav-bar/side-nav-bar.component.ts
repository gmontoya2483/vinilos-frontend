import { Component, OnInit } from '@angular/core';
import {MeService} from '../../../me/services/me/me.service';
import {SideNavBarService} from '../../services/side-nav-bar/side-nav-bar.service';
import {SideNavItem} from '../../interfaces/side-nav-bar.interface';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styles: [
  ]
})
export class SideNavBarComponent implements OnInit {

  public sideNavBarGeneralItems: SideNavItem[] = this.sideNavBarService.sideNavBarGeneralItems;
  public sideNavBarCommunityItems: SideNavItem[] = this.sideNavBarService.sideNavBarCommunityItems;

  constructor( public meService: MeService,
               private sideNavBarService: SideNavBarService) {
    this.meService.getMe().subscribe((resp: any ) => {  });

  }

  ngOnInit(): void {
  }

}
