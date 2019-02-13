import { Http, Headers, RequestOptions, URLSearchParams ,ResponseContentType, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the RestApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestApiServiceProvider {
  domainurl: any = "http://116.203.71.189:3100";
  getscreenurl = "Screen";
  constructor(public http: Http) {
    console.log('Hello RestApiServiceProvider Provider');
  }

  // Private
  private extractData ( res: Response ) {
    let body = res;
    return body || {};
  }

  private handleError ( error: Response | any ) {
    let errMsg: string;
    if ( error instanceof Response ) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error( errMsg );
    return Observable.throw( errMsg );
  }


  getAllScreen (): Observable<any> {
    return this.http.get( this.domainurl + this.getscreenurl ).pipe(
      map( this.extractData ),
      catchError( this.handleError )
    );
  }

  getNearByScreen (jsonPayload:any): Observable<any> {
    var headers = new Headers();

 
  
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Credentials' , "true");

    
   
   headers.append('client-id','JamesBond');
    headers.append('client-secret','777898');

     let options = new RequestOptions({ headers:headers});
    return this.http.post( "http://116.203.71.189:3100/get_screens_by_radius", jsonPayload,options).pipe(
      map( this.extractData ),
      catchError( this.handleError )
    );
  }

}
