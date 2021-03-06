const chalkin = Deno.env.get("DENO_DEPLOYMENT_ID") === undefined
  ? (await import("https://deno.land/x/chalkin@v0.1.3/mod.ts")).default
  : new Proxy({}, {
    get() {
      return new Proxy(Function.prototype, this)
    }
  })

console.log(chalkin.green("Hello, World!"));
console.log(chalkin.green.bgRed("Hello, World!"));
console.log(chalkin.green.bgRed.bold("Hello, World!"));
