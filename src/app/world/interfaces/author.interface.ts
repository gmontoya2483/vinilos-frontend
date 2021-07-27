import {Pagination} from '../../shared/interfaces/pagination.interface';
import {IsDeleted} from '../../shared/interfaces/is-deleted.interface';
import {Vinyl} from './vinyl.interface';

export interface AuthorsRootResponse {
  ok: boolean;
  authors: Authors;
}

export interface AuthorRootResponse {
  ok: boolean;
  author: Author;
  mensaje: string;
}

export interface AuthorVinylsRootResponse {
  ok: boolean;
  vinyls?: Vinyl[];
  mensaje?: string;
}



export interface Authors {
  pagination: Pagination;
  authors: Author[];
}

export interface AuthorErrorResponse {
  ok: boolean;
  mensaje: string;
}

export interface Author {
  isDeleted: IsDeleted;
  _id: string;
  name: string;
  lastName: string;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  __v: number;
}

export interface ShortAuthor {
  _id: string;
  name: string;
  lastName: string;
}

export interface NewAuthor {
  name: string;
  lastName: string;
}



