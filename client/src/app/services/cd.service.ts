import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import  'rxjs/add/operator/map';

@Injectable()
export class CdService {

  constructor(private http:Http) {
    //console.log('CD service initialized...')
  }

  getCdList(){
    return this.http.get('http://localhost:4000/api/cd')
      .map(res => res.json());
  }


  addCd(newCd){
    //console.log(newCd);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/cd', JSON.stringify(newCd), {headers: headers})
      .map(res => res.json());
  }

}
