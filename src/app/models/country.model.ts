import {IUsuario} from './ususario.model';

export interface ICountry {
  _id?: string;
  name?: string;
}


export class Country {

  public _id: string;
  public name: string;

  constructor() {  }

  public static createCountry( pais: ICountry ): Country{

    const country = new Country();

    country._id = pais._id || null;
    country.name = pais.name || null;

    return country;
  }

}
