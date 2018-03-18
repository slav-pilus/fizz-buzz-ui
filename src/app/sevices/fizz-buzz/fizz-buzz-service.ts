import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class FizzBuzzService {

  constructor(private http: HttpClient) { }
  private fizzBuzzApiUrl = environment.fizzBuzzApiUrl;

  getResult(input: number) {
    return this.http.get(this.fizzBuzzApiUrl + '/' + input);
  }
}
