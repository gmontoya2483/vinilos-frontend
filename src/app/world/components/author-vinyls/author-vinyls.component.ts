import {Component, Input, OnInit} from '@angular/core';
import {Vinyl, ShortVinyl} from '../../interfaces/vinyl.interface';
import {Router} from '@angular/router';
import {AuthorsService} from '../../services/authors/authors.service';
import {ViewVinylComponent} from '../../pages/view-vinyl/view-vinyl.component';
import {MeCopyService} from '../../../copy/services/me-copy/me-copy.service';

@Component({
  selector: 'app-author-vinyls',
  templateUrl: './author-vinyls.component.html',
  styles: [
  ]
})
export class AuthorVinylsComponent implements OnInit {

  @Input() authorId: string;
  @Input() authorName: string;
  @Input() authorLastName: string;

  private _vinyls: ShortVinyl [] = [];
  get vinyls(): ShortVinyl []{
    return [... this._vinyls];
  }

  constructor(private router: Router,
              private authorService: AuthorsService,
              private meCopyService: MeCopyService) { }

  ngOnInit(): void {
    this.getBooks();
  }


  getBooks() {
    this.authorService.getAuthorVinyls(this.authorId).subscribe(
      (resp: Vinyl[]) => {
        this._vinyls = resp;
      }
    );
  }

  showVinyl(vinylId: string): void {
    this.router.navigate(['/world', 'authors', 'view', this.authorId, 'vinyls', vinylId]).then();
  }

  addCopy(vinylId: string) {
    this.meCopyService.addCopy( vinylId ).subscribe();
  }
}
