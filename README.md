# ngrok-ts

ngrok-ts helps running ngrok tunnel within your application.

## Example

### Install

```console
deno add jsr:@demin/ngrok-ts
```

### Run

```typescript
import { connect } from "@demin/ngrok-ts";

console.log(await connect({ port: 3000, protocol: "http" }).next());
```
