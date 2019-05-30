# JWT

JSON Web Token, on [npmjs.com](https://www.npmjs.com/package/@iinfinity/jwt).

# Change Log

## 0.0.0 => 0.1.0

- feat: JWT sign & verify

See [CHANGELOG](https://github.com/DevinDon/jwt/blob/master/docs/CHANGELOG.md) for detail.

# Usage

See [simple demo](https://github.com/DevinDon/jwt/blob/master/src/demo/index.ts) for more detail.

## Create

Create a default JWT instance.

```typescript
const jwt = new JWT(); // same as `new JWT({ algorithm: 'HS512', key: String(Date.now()), urlsafe: false })`
```

Create a custom JWT instance with **urlsafe**:

```typescript
const customJWT = new JWT({ algorithm: 'HS256', key: 'key', urlsafe: true });
```

## Sign

Define header & payload first:

```typescript
const header: Header = {
  alg: 'HS256',
  typ: 'JWT'
};

const payload: Payload = {
  username: 'user',
  password: 'pass'
};
```

Sign with payload & default header:

```typescript
const token = jwt.sign(payload);
```

Sign with payload & header, you can set special algorithm in header:

```typescript
const token256 = jwt.sign(payload, header);
```

## Verify

Verify token & parse it:

```typescript
const verified: JSONWebToken | undefined = jwt.verify(token); // if failed to verify, return undefined
const verified256: JSONWebToken | undefined = jwt.verify(token); // use header.alg as Algorithm
```

If failed to verify, it will return undefined.

# Author

Devin Don(IInfinity), <I.INF@Outlook.com>.

# LICENSE

[THE MIT LICENSE](https://github.com/DevinDon/jwt/blob/master/LICENSE).
