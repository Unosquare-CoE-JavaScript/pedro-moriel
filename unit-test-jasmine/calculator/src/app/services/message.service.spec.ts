import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let msg: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    msg = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(msg).toBeTruthy();
  });

  it('should return a msg', () => {
    expect(msg.message).toBeDefined();
    const message = msg.message('Hello Pedro!')
    expect(message).not.toBe('Hello Pedro$$');
  });
});
