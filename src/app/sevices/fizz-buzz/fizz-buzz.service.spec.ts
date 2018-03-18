import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {FizzBuzzResponse} from '../../model/FizzBuzzResponse';
import {FizzBuzzService} from './fizz-buzz-service';

describe('FizzBuzzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FizzBuzzService,
      ] , imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it(`should call correct endpoint`,
    async(inject([FizzBuzzService, HttpTestingController], (service: FizzBuzzService, backend: HttpTestingController) => {
        service.getResult(15).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.url === environment.fizzBuzzApiUrl + '/15';
        }, `GET request for FizzBuzz api`);
      })
    )
  );

  it(`should handle response`,
    async(inject([FizzBuzzService, HttpTestingController], (service: FizzBuzzService, backend: HttpTestingController) => {
        service.getResult(15).subscribe((next: FizzBuzzResponse) => {
          expect(next.input).toBe(15);
          expect(next.result).toBe('FizzBuzz');
        });

        backend.expectOne(environment.fizzBuzzApiUrl + '/15').flush({ input: 15, result: 'FizzBuzz'}, { status: 200, statusText: 'Ok' });
      })
    )
  );

  it(`should handle errors`,
    async(inject([FizzBuzzService, HttpTestingController], (service: FizzBuzzService, backend: HttpTestingController) => {
        service.getResult(15).subscribe(() => {
        }, err => {
          expect(err.status).toBe(404);
        });

        backend.expectOne(environment.fizzBuzzApiUrl + '/15').flush(null, { status: 404, statusText: 'Not found'});
      })
    )
  );
});
