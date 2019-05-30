import { JWT } from '../main';

describe('Index', () => {

  it('should export class JWT`', done => {
    const jwt = new JWT();
    expect(jwt instanceof JWT).toBeTruthy();
    done();
  });

});
