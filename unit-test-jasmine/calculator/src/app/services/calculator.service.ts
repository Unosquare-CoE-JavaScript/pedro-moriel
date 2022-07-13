import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  public add(num1: any, num2: any) {
    return num1 + num2; 
  }

  public sustraction(num1: number, num2: number) {
    return num1 - num2;
  }

  public multiply(num1: number, num2: number) {
    return num1 * num2;
  }

  public division(num1: number, num2: number) {
    return num1 / num2
  }
}
