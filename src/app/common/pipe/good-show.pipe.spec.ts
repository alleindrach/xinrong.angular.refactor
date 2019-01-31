import { GoodShowPipe } from './good-show.pipe';
import { LocalstorageService } from '../../service/db/localstorage.service';
describe('GoodShowPipe', () => {
  it('create an instance', () => {
    const pipe = new GoodShowPipe();
    expect(pipe).toBeTruthy();
  });
});
