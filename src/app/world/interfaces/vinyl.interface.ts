import {Pagination} from '../../shared/interfaces/pagination.interface';
import { ShortAuthor} from './author.interface';
import {ShortGenre} from './genre.interface';
import {IsDeleted} from '../../shared/interfaces/is-deleted.interface';


export interface VinylsRootResponse {
  ok: boolean;
  vinyls: Vinyls;
}

export interface VinylRootResponse {
  ok: boolean;
  vinyl: Vinyl;
  mensaje: string;
}

export interface VinylErrorResponse {
  ok: boolean;
  mensaje: string;
}

export interface Vinyls {
  pagination: Pagination;
  vinyls: Vinyl[];
}

export interface Vinyl {
  isDeleted: IsDeleted;
  img: string | null;
  _id: string;
  title: string;
  description: string;
  author: ShortAuthor;
  genre: ShortGenre;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  __v: number;
}


export interface ShortVinyl {
  isDeleted: IsDeleted;
  img: string | null;
  _id: string;
  title: string;
  description: string;
  author: ShortAuthor;
  genre: ShortGenre;
}

export interface ReferencedVinyl {
  _id: string;
  title: string;
  description: string;
  author: ShortAuthor;
  genre: ShortGenre;
}

export interface NewVinyl{
  title: string;
  description: string;
  authorId: string;
  genreId: string;
}










