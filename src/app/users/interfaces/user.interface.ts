import {CopiesRootResponse} from '../../copy/interfaces/copy.interface';

export interface UserRootResponse {
  ok: boolean;
  usuario?: User;
  mensaje?: string | undefined;
}

export interface User {
  isValidated: IsValidated;
  isDeleted: IsDeleted;
  isAdmin: boolean;
  img: string;
  paisResidencia: Pais;
  comunidad: Comunidad;
  _id: string;
  email: string;
  nombre: string;
  apellido: string;
  createdDateTime: Date;
  updatedDateTime: Date;
}

export interface Comunidad {
  _id: string;
  name: string;
}

export interface Pais {
  _id: string;
  name: string;
}

export interface IsDeleted {
  value: boolean;
  deletedDateTime: null;
}

export interface IsValidated {
  value: boolean;
  validatedDateTime: Date;
}
