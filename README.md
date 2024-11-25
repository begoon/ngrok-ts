# ngrok-ts

ngrok-ts helps running ngrok tunnel within your application.

The primary purpose of this package is to help run applications
locally during development.

## Example

### Install

```console
deno add jsr:@demin/ngrok-ts
```

### Run

Using `deno` (see [tunnel.ts](./tunnel.ts)):

```console
deno run -A tunnel.ts
```

or

```typescript
import { connect, version } from "@demin/ngrok-ts";

console.log(version());

console.log(await connect({ port: 3000, protocol: "http" }).next());
```

The example above should print something like:

```console
ngrok version 3.18.4
ngrok connected { url: "c3c4-178-60-121-43.ngrok-free.app" }
c3c4-178-60-121-43.ngrok-free.app
```

The `connect` function returns an async iterator, so the `next()` method
should be called to retrieve the response.

This approach allows `ngrok` to run while the rest of the application also
keeps running.

When the application exits, `ngrok` process also exists.
