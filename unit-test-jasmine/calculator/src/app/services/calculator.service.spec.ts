import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { MessageService } from './message.service';

describe('CalculatorService', () => {

  // we can define global variables if needed
  let calc: CalculatorService;
  let msg: MessageService;
  let result;

  // will execute before each 'it' sentence, so is a good place to initialize things before its use
  beforeEach(() => {

    //Using TestBed Config we can inject services or dependencies
    TestBed.configureTestingModule({});
    calc = TestBed.inject(CalculatorService);
    msg = TestBed.inject(MessageService);
  });

  // each 'it' sentence will test a part(s) of the code that we specify on it
  it('should create dependencies', () => { 
    expect(calc).toBeTruthy();
    expect(msg).toBeTruthy();
  });

  it('should add 2 numbers', () => {
    expect(calc.add).toBeDefined();
    result = calc.add(20, 10);
    expect(result).toBe(30);
  });

  it('should substract 2 numbers', () => {
    expect(calc.sustraction).toBeDefined();
    result = calc.sustraction(20, 5);
    expect(result).toBe(15);
  });

  it('should multiply 2 numbers', () => {
    expect(calc.multiply).toBeDefined();
    result = calc.multiply(30, 5);
    expect(result).toBe(150);
  });

  it('should divide 2 numbers', () => {
    expect(calc.division).toBeDefined();
    result = calc.division(15, 5);
    expect(result).toBe(3);
  });
  
});
