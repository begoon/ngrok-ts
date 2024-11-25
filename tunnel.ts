import { connect, version } from "jsr:@demin/ngrok-ts";

console.log(version());

const tunnel = await connect({ protocol: "http", port: 8080 }).next();
console.log(tunnel.value);
