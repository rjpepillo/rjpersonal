/**
 * Created by arjinreyes on 02/02/2017.
 */

declare namespace restangular {
  /**
   *  Added this custom restangular ts because several is missing in typings - DefinitelyTyped
   */

  interface IService {
    several(route: string, id?: number[]): IElement;
  }
}
