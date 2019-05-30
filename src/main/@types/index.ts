export enum AlgorithmType {
  HS256 = 'sha256',
  HS384 = 'sha384',
  HS512 = 'sha512',
  RS512 = 'RSA-SHA512'
}

export type Algorithm = 'HS256' | 'HS384' | 'HS512' | 'RS512';

export type Type = 'JWT';

export interface Header {
  [key: string]: string;
  alg: Algorithm;
  typ: Type;
}

export interface Payload {
  [key: string]: any;
}

export type Signature = string;

export interface JSONWebToken {
  header: Header;
  payload: Payload;
  signature: Signature;
}

export interface Option {
  algorithm: Algorithm;
  key: string;
  urlsafe: boolean;
}
