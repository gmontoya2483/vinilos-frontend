import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorsService} from '../../services/authors/authors.service';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styles: [
  ]
})
export class NewAuthorComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private authorService: AuthorsService) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  back() {
    this.router.navigate(['/world', 'authors']).then();
  }

  save() {
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    const { name, lastName } = this.miFormulario.value;
    this.authorService.saveAuthor({name, lastName}).subscribe();
    this.router.navigate(['/world', 'authors']).then();
  }


}
