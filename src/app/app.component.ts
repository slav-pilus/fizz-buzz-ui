import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FizzBuzzResponse} from './model/FizzBuzzResponse';
import {FizzBuzzService} from './sevices/fizz-buzz/fizz-buzz-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FizzBuzz';
  error = false;
  inputNumber: number;
  result: FizzBuzzResponse;

  constructor(private fizzBuzzService: FizzBuzzService) {}

  playFizzBuzz(form: NgForm) {
    if (form.valid) {
      this.fizzBuzzService.getResult(this.inputNumber).subscribe((fizzBuzzResponse: FizzBuzzResponse) => {
        this.error = false;
        this.result = fizzBuzzResponse;
      }, () => {
        this.error = true;
      });
    } else {
      this.result = undefined;
      this.error = true;
    }
  }
}
