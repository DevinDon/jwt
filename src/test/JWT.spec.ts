import { createHmac } from 'crypto';
import { AlgorithmType, Header, JWT, Payload, Signature } from '../main';

describe('class JWT unit test', () => {

  let jwt: JWT;

  beforeEach(done => {
    jwt = new JWT({ algorithm: 'HS512', key: '', urlsafe: false });
    done();
  });

  it('base64ify(string) & urlsafify(string) should work', done => {
    const urlsafed = '-_';
    const base64ed = '+/==';
    expect(jwt.base64ify(urlsafed)).toEqual(base64ed);
    expect(jwt.urlsafify(base64ed)).toEqual(urlsafed);
    done();
  });

  it('decode(string) & encode(string) should work', done => {
    const header: Header = { alg: 'HS512', typ: 'JWT' };
    const payload: Payload = { username: 'user', password: 'pass' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    expect(jwt.encode(header)).toEqual(encodedHeader);
    expect(jwt.encode(payload)).toEqual(encodedPayload);
    expect(jwt.decode(encodedHeader)).toEqual(header);
    expect(jwt.decode(encodedPayload)).toEqual(payload);
    done();
  });

  it('sign(Payload, Header?) & verify(string) should work', done => {
    const header: Header = { alg: 'HS256', typ: 'JWT' };
    const payload: Payload = { username: 'user', password: 'pass' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature: Signature = createHmac(AlgorithmType[header.alg], '').update(`${encodedHeader}.${encodedPayload}`).digest('base64');
    expect(jwt.sign(payload, header)).toEqual(`${encodedHeader}.${encodedPayload}.${signature}`);
    expect(jwt.verify(jwt.sign(payload, header))).toEqual({ header, payload, signature });
    done();
  });

  it('sign(Payload, Header?) & verify(string) with urlsafed should work', done => {
    jwt = new JWT({ algorithm: 'HS512', key: '', urlsafe: true });
    const header: Header = { alg: 'HS256', typ: 'JWT' };
    const payload: Payload = { username: 'user', password: 'pass' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature: Signature = createHmac(AlgorithmType[header.alg], '').update(`${encodedHeader}.${encodedPayload}`).digest('base64');
    expect(jwt.sign(payload, header)).toEqual(`${jwt.urlsafify(encodedHeader)}.${jwt.urlsafify(encodedPayload)}.${jwt.urlsafify(signature)}`);
    expect(jwt.verify(jwt.sign(payload, header))).toEqual({ header, payload, signature });
    done();
  });

});
