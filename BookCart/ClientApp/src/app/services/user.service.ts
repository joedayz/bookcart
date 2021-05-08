import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/user/';
  }

}
