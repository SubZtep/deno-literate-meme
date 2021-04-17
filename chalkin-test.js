
let chalkin
if (Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined) {
  chalkin = (await import("https://deno.land/x/chalkin@v0.1.3/mod.ts")).default
} else {
  const handler = {
    get: (target, name) => {
      return new Proxy(Function.prototype, handler);
    },
  }
  chalkin = new Proxy({}, handler)
}

console.log(chalkin.green("Hello, World!"));
console.log(chalkin.green.bgRed("Hello, World!"));
console.log(chalkin.green.bgRed.bold("Hello, World!"));
