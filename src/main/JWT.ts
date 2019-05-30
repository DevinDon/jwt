import { createHmac } from 'crypto';
import { AlgorithmType, Header, JSONWebToken, Option, Payload } from './@types';

export class JWT {

  constructor(private option: Option = {
    algorithm: 'HS512',
    key: String(Date.now()),
    urlsafe: false
  }) { }

  base64ify(urlsafed: string): string {
    for (let i = urlsafed.length % 4; i % 4 !== 0; i++) {
      urlsafed += '=';
    }
    return urlsafed.replace(/_/g, '/').replace(/-/g, '+');
  }

  urlsafify(encoded: string): string {
    return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  decode(encoded: string): Header | Payload | undefined {
    return JSON.parse(Buffer.from(encoded, 'base64').toString());
  }

  encode(section: Header | Payload): string {
    return Buffer.from(JSON.stringify(section)).toString('base64');
  }

  sign(payload: Payload, header: Header = { alg: this.option.algorithm, typ: 'JWT' }): string {
    const body = `${this.encode(header)}.${this.encode(payload)}`;
    const token = body + '.' + createHmac(AlgorithmType[header.alg], this.option.key).update(body).digest('base64');
    return this.option.urlsafe ? this.urlsafify(token) : token;
  }

  verify(encoded: string): JSONWebToken | undefined {
    const arr: string[] = this.option.urlsafe
      ? encoded.split('.').map(v => this.base64ify(v))
      : encoded.split('.');
    const header: Header = JSON.parse(Buffer.from(arr[0], 'base64').toString());
    const verified = createHmac(AlgorithmType[header.alg], this.option.key).update(`${arr[0]}.${arr[1]}`).digest('base64');
    if (verified === arr[2]) {
      return {
        header,
        payload: JSON.parse(Buffer.from(arr[1], 'base64').toString()),
        signature: arr[2]
      };
    }
  }

}
