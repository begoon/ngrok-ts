/**
 * This module contains functions to interact with ngrok.
 * @module
 *
 * @example
 * ```ts
 * import { connect, version } from "jsr:@demin/ngrok-ts";
 * console.log(version());
 *
 * const tunnel = await connect({ protocol: "http", port: 8080 }).next();
 * console.log(tunnel.value);
 * ```
 */

import { mergeReadableStreams } from "@std/streams/merge-readable-streams";
import { TextLineStream } from "@std/streams/text-line-stream";

/** This type represents the options for the ngrok connection. */
export type NgrokOptions = {
    protocol: string;
    port: number;
};

/** This function returns the version of ngrok. */
export function version(): string {
    const process = new Deno.Command("ngrok", {
        args: ["version"],
        stdout: "piped",
        stderr: "piped",
    }).outputSync();
    return new TextDecoder().decode(process.stdout).trim();
}

/** This function connects to ngrok and returns a URL of the tunnel. */
export async function* connect(options: NgrokOptions): AsyncGenerator<string, void, unknown> {
    const process = new Deno.Command("ngrok", {
        args: [options.protocol, options.port.toString(), "--log=stdout"],
        stdin: "piped",
        stdout: "piped",
        stderr: "piped",
    }).spawn();
    process.stdin?.close();

    const output = mergeReadableStreams(process.stdout, process.stderr)
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream());

    const ready = /started tunnel.*:\/\/(.*)/;
    for await (const line of output) {
        const connected = line.match(ready);
        if (connected) {
            const url = connected[1];
            console.log("ngrok connected", { url });
            yield connected[1] as string;
        }
    }
    console.log("ngrok exited");
}
