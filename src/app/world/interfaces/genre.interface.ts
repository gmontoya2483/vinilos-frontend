import {IsDeleted} from '../../shared/interfaces/is-deleted.interface';

export interface ShortGenre {
  _id: string;
  name: string;
}


export interface GenreRootResponse {
  ok: boolean;
  total: number;
  genres: Genre[];
}

export interface Genre {
  isDeleted: IsDeleted;
  _id: string;
  name: string;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  __v: number;
}



