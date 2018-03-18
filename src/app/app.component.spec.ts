import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {FizzBuzzService} from './sevices/fizz-buzz/fizz-buzz-service';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const response = { 'input': 15, 'result': 'FizzBuzz'};
class FakeFizzBuzzService {
  getResult() {
    return Observable.of(response);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ], imports: [
        FormsModule,
        ReactiveFormsModule
      ], providers: [
        { provide: FizzBuzzService, useClass: FakeFizzBuzzService},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'FizzBuzz'`, async(() => {
    expect(component.title).toEqual('FizzBuzz');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to FizzBuzz!');
  }));

  describe('playFizzBuzz', () => {
    it('should set data from service', function () {
      const fizzBuzzService = fixture.debugElement.injector.get(FizzBuzzService);
      const serviceCall = spyOn(fizzBuzzService, 'getResult').and.returnValue(Observable.of(response));

      component.playFizzBuzz(<NgForm>{valid: true});

      expect(component.result).toBe(response);
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });

    it('should call service with correct data', function () {
      const fizzBuzzService = fixture.debugElement.injector.get(FizzBuzzService);
      const serviceCall = spyOn(fizzBuzzService, 'getResult').and.returnValue(Observable.of(response));
      component.inputNumber = 1;

      component.playFizzBuzz(<NgForm>{valid: true});

      expect(component.result).toBe(response);
      expect(serviceCall).toHaveBeenCalledWith(1);
    });

    it('should not set data from service when input form invalid', function () {
      component.playFizzBuzz(<NgForm>{valid: false});

      expect(component.result).toBe(undefined);
    });

    it('should clear old response when input form invalid', function () {
      component.result = response;

      component.playFizzBuzz(<NgForm>{valid: false});

      expect(component.result).toBe(undefined);
    });

    it('should set error when form invalid', function () {
      component.playFizzBuzz(<NgForm>{valid: false});

      expect(component.error).toBe(true);
    });

    it('should set error to false when service call success', function () {
      component.error = true;
      const fizzBuzzService = fixture.debugElement.injector.get(FizzBuzzService);
      const serviceCall = spyOn(fizzBuzzService, 'getResult').and.returnValue(Observable.of(response));

      component.playFizzBuzz(<NgForm>{valid: true});

      expect(component.error).toBe(false);
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });


    it('should set error to true when service call fails', function () {
      const fizzBuzzService = fixture.debugElement.injector.get(FizzBuzzService);
      const serviceCall = spyOn(fizzBuzzService, 'getResult').and.returnValue(Observable.throw('error'));

      component.playFizzBuzz(<NgForm>{valid: true});

      expect(component.error).toBe(true);
      expect(serviceCall).toHaveBeenCalledTimes(1);

    });
  });
});
