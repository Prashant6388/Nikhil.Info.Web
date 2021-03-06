import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor(private http: HttpClient) { }

  getassets() {
    return this.http.get<any>(environment.url + 'api/inventory/getassets');
  }
  getvaservers() {
    return this.http.get<any>(environment.url + 'api/inventory/getvaservers');
  }
  getptnetworkservices() {
    return this.http.get<any>(environment.url + 'api/inventory/getptnetworkservices');
  }
  getapplicationsecurity() {
    return this.http.get<any>(environment.url + 'api/inventory/getapplicationsecurity');
  }
  getusers() {
    return this.http.get<any>(environment.url + 'api/inventory/getusers');
  }
  login(request) {
    return this.http.post<any>(environment.url + 'api/inventory/login', request);

  }
  postUser(request) {
    return this.http.post<any>(environment.url + 'api/inventory/postuser', request);
  }
  sendEmail(request) {
    return this.http.post<any>(environment.url + 'api/inventory/sendmail', request);
  }
  getendpoints() {
    return this.http.get<any>(environment.url + 'api/inventory/getendpoints');
  }
  postEndpoint(request) {
    return this.http.post<any>(environment.url + 'api/inventory/postendpoint', request);
  }
  deleteEndpoint(iid) {
    return this.http.delete<any>(environment.url + 'api/inventory/deleteendpoint',
    {params : { id : iid} } );
  }
  getapplicationsecuritybarchart() {
    return this.http.get<any>(environment.url + 'api/inventory/getapplicationsecuritybarchart');
  }
  getptnetworkservicebarchart() {
    return this.http.get<any>(environment.url + 'api/inventory/getptnetworkservicebarchart');
  }
  getvaserverbarchart() {
    return this.http.get<any>(environment.url + 'api/inventory/getvaserverbarchart');
  }
  deleteUser(id) {
    return this.http.post<any>(environment.url + 'api/inventory/deleteuser/'+ id, null);
  }
  getServers() {
    return this.http.get<any>(environment.url + 'api/inventory/getservers');
  }
  postServer(request) {
    return this.http.post<any>(environment.url + 'api/inventory/postserver', request);
  }
  deleteServer(iid) {
    return this.http.delete<any>(environment.url + 'api/inventory/deleteserver',
    {params : { id : iid} } );
  }
}
