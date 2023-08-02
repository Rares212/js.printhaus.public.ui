import { HourToTimePipe } from './hour-to-time.pipe';

describe('HourToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new HourToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
