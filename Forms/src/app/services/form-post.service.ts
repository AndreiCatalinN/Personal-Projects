/**
 * Created by E086766 on 12/02/2019.
 */

import {Injectable} from "@angular/core";
import { Response, Headers, RequestOptions } from '@angular/http';
import {HttpClient} from 'angular/common/http';
import {Employee} from "../models/employee.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class FormPostService{
  constructor(private value: HttpClient){}

  private extractData(res: Response){
    let body = res.json();
    return body.fields || {};
  }

  private handleError(error: any){
    console.log('post error\n');
    console.log(error);
    return Observable.throw(error.statusText);
  }
  postEmployeeForm(employee: Employee): Observable<any>{

    let body = JSON.stringify(employee);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.value.post('http://localhost:3100/postemployee', body, options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }


}