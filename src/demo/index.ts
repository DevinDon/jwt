import { Header, JSONWebToken, JWT, Payload } from '../main';

const jwt = new JWT(); // same as `new JWT({ algorithm: 'HS512', key: String(Date.now()), urlsafe: false })`
const customJWT = new JWT({ algorithm: 'HS256', key: 'key', urlsafe: true });

const header: Header = {
  alg: 'HS256',
  typ: 'JWT'
};

const payload: Payload = {
  username: 'user',
  password: 'pass'
};

const token = jwt.sign(payload);
const token256 = jwt.sign(payload, header); // use custom header

const verified: JSONWebToken | undefined = jwt.verify(token); // if failed to verify, return undefined
const verified256: JSONWebToken | undefined = jwt.verify(token); // use header.alg as Algorithm
