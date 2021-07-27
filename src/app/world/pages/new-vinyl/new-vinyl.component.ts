import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {VinylsService} from '../../services/vinyls/vinyls.service';
import {GenresService} from '../../services/genres/genres.service';
import {ShortGenre} from '../../interfaces/genre.interface';
import {ShortAuthor} from '../../interfaces/author.interface';
import {AuthorsService} from '../../services/authors/authors.service';

@Component({
  selector: 'app-new-vinyl',
  templateUrl: './new-vinyl.component.html',
  styles: [
  ]
})
export class NewVinylComponent implements OnInit {

  private _genres: ShortGenre[] = [];
  public get genres(): ShortGenre[] {
    return [... this._genres];
  }

  private _authors: ShortAuthor[] = [];
  public get authors(): ShortAuthor[] {
    return [... this._authors];
  }


  miFormulario: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)]],
    genreId: ['', [Validators.required]],
    authorId: ['', [Validators.required]]
  });


  constructor(private router: Router,
              private fb: FormBuilder,
              private genreService: GenresService,
              private vinylsService: VinylsService,
              private authorService: AuthorsService) { }

  ngOnInit(): void {
    this.loadGenres();
    this.loadAuthors();
  }

  private loadGenres(): void {
    this.genreService.getGenresList().subscribe((resp: ShortGenre[]) => {
       this._genres = resp;
    });
  }

  private loadAuthors(): void {
    this.authorService.getAuthorsList().subscribe((resp: ShortAuthor[]) => {
      this._authors = resp;
    });
  }


  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  back() {
    this.router.navigate(['/world', 'books']).then();
  }

  save() {
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    const { title, description, genreId, authorId } = this.miFormulario.value;
    this.vinylsService.saveVinyl({title, description, genreId, authorId}).subscribe();
    this.router.navigate(['/world', 'vinyls']).then();
  }

}
