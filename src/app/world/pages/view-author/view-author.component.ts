import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Author} from '../../interfaces/author.interface';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {AuthorsService} from '../../services/authors/authors.service';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styles: []
})
export class ViewAuthorComponent implements OnInit {

  author: Author;
  private authorId: string;

  constructor( private authorService: AuthorsService,
               private router: Router,
               private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorId = this.activatedRouter.snapshot.paramMap.get('id');
    this.getAuthor();
  }

  back() {
    this.router.navigate(['/world', 'authors']).then();
  }

  private getAuthor() {
    this.authorService.getSingleAuthor(this.authorId).subscribe(
      (resp: Author) => {
        this.author = resp;
      }
    );
  }

}
