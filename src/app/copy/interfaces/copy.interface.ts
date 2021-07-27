import {IsDeleted} from '../../shared/interfaces/is-deleted.interface';
import {Vinyl, ReferencedVinyl} from '../../world/interfaces/vinyl.interface';
import {Pagination} from '../../shared/interfaces/pagination.interface';

export interface CopiesRootResponse {
  ok: boolean;
  copies: Copies;
  mensaje?: string | undefined;
}

export interface Copies {
  pagination: Pagination;
  copies: Copy[];
}

export interface Copy {
  isDeleted: IsDeleted;
  isPublic: boolean;
  _id: string;
  vinyl: ReferencedVinyl;
  owner: Owner;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  isOwnerFollowedByMe?: boolean;
  __v: number;
}

export interface ShortCommunity {
  _id: string;
  name: string;
}


export interface Owner {
  comunidad: ShortCommunity;
  _id: string;
  email: string;
  nombre: string;
  apellido: string;
}

