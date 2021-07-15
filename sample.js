const json2emap = require("./index");

console.log(json2emap([1, 2, 3]));

console.log(json2emap({ a: 123, b: "Hello", c: "World" }));

console.log(
  json2emap({
    name: "emap",
    version: "0.0.1",
    description: "",
    main: "index.js",
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
      "fix:format": "prettier --write **/*.{js,json,css}",
    },
    author: "",
    license: "ISC",
    dependencies: {
      lodash: "^4.17.21",
    },
    devDependencies: {
      prettier: "^2.3.2",
    },
  })
);

console.log(
  json2emap({
    a: ["Hello", 123],
    world: [{ b: [4, 5, 6] }, 7, { a: 32, b: "hello" }],
  })
);
