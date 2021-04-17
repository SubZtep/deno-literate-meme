import c from "https://deno.land/x/chalkin@v0.1.3/mod.ts";

console.log("XXX", Deno.env.toObject())

const handler = {
  get: (target, name) => {
    return new Proxy(Function.prototype, handler)
  }
}

const chalkin = false ? c : new Proxy({}, handler)

console.log(chalkin.green("Hello, World!"));
console.log(chalkin.green.bgRed("Hello, World!"));
console.log(chalkin.green.bgRed.bold("Hello, World!"));
