const json2emap = require("../index");
const fs = require("fs");
const path = require("path");

test("J2E", () => {
  expect(
    json2emap({
      id: 123,
      name: "rhenium",
      isPublic: true,
      accounts: [
        {
          type: "github",
          link: "https://github.com/rheniumNV",
        },
        {
          type: "twitter",
          link: "https://twitter.com/rhenium_nv",
        },
      ],
    })
  ).toEqual(
    "l$#8$#v$#k0$#id$#v0$#123$#t0$#number$#k1$#name$#v1$#rhenium$#t1$#string$#k2$#isPublic$#v2$#true$#t2$#bool$#k3$#accounts.length$#v3$#2$#t3$#number$#k4$#accounts_0_.type$#v4$#github$#t4$#string$#k5$#accounts_0_.link$#v5$#https://github.com/rheniumNV$#t5$#string$#k6$#accounts_1_.type$#v6$#twitter$#t6$#string$#k7$#accounts_1_.link$#v7$#https://twitter.com/rhenium_nv$#t7$#string$#"
  );
});

test("J2E-escape", () => {
  expect(
    json2emap({
      id: 123,
      "\\name": "rhenium$#",
      accounts: [
        {
          type: "github",
          link: "https://github.com/rheniumNV",
        },
        {
          type: "twitter",
          link: "https://twitter.com/rhenium_nv",
        },
      ],
    })
  ).toEqual(
    "l$#7$#v$#k0$#id$#v0$#123$#t0$#number$#k1$#\\\\name$#v1$#rhenium$\\#$#t1$#string$#k2$#accounts.length$#v2$#2$#t2$#number$#k3$#accounts_0_.type$#v3$#github$#t3$#string$#k4$#accounts_0_.link$#v4$#https://github.com/rheniumNV$#t4$#string$#k5$#accounts_1_.type$#v5$#twitter$#t5$#string$#k6$#accounts_1_.link$#v6$#https://twitter.com/rhenium_nv$#t6$#string$#"
  );
});

test("J2E-escape-multi", () => {
  expect(
    json2emap({
      id: 123,
      "\\name": "rhenium$#",
      accounts: [
        {
          "typ\\e\\": "github",
          link: "https://github.com/rheniumNV",
        },
        {
          type: "twitter",
          link: "https://twitter.com/rhenium_nv",
        },
      ],
    })
  ).toEqual(
    "l$#7$#v$#k0$#id$#v0$#123$#t0$#number$#k1$#\\\\name$#v1$#rhenium$\\#$#t1$#string$#k2$#accounts.length$#v2$#2$#t2$#number$#k3$#accounts_0_.typ\\\\e\\\\$#v3$#github$#t3$#string$#k4$#accounts_0_.link$#v4$#https://github.com/rheniumNV$#t4$#string$#k5$#accounts_1_.type$#v5$#twitter$#t5$#string$#k6$#accounts_1_.link$#v6$#https://twitter.com/rhenium_nv$#t6$#string$#"
  );
});

test("J2E-return-whitespace", () => {
  expect(json2emap({ id: "\n \n" })).toEqual(
    "l$#1$#v$#k0$#id$#v0$#\n \n$#t0$#string$#"
  );
});

const json1 = require("./test1.json");
const json1res = fs
  .readFileSync(path.join(__dirname, "test1.result"))
  .toString();

test("J2E-2", () => {
  expect(json2emap(json1)).toEqual(json1res);
});

describe("resolveTypeFunc option", () => {
  const resolveTypeFunc = (value) =>
    typeof value === "number" ? "float" : "string";

  test("applies to nested values", () => {
    expect(json2emap({ a: { b: 1 }, c: ["x"] }, { resolveTypeFunc })).toEqual(
      "l$#3$#v$#k0$#a.b$#v0$#1$#t0$#float$#k1$#c.length$#v1$#1$#t1$#number$#k2$#c_0_$#v2$#x$#t2$#string$#"
    );
  });

  test("does not override the type of array length", () => {
    expect(json2emap([true], { resolveTypeFunc: () => "custom" })).toEqual(
      "l$#2$#v$#k0$#length$#v0$#1$#t0$#number$#k1$#_0_$#v1$#true$#t1$#custom$#"
    );
  });
});

describe("root values", () => {
  test("primitive root does not throw", () => {
    expect(json2emap(5)).toEqual("l$#1$#v$#k0$#$#v0$#5$#t0$#number$#");
    expect(json2emap("a")).toEqual("l$#1$#v$#k0$#$#v0$#a$#t0$#string$#");
    expect(json2emap(null)).toEqual("l$#1$#v$#k0$#$#v0$#null$#t0$#any$#");
  });

  test("empty object and array", () => {
    expect(json2emap({})).toEqual("l$#0$#v$#");
    expect(json2emap([])).toEqual("l$#1$#v$#k0$#length$#v0$#0$#t0$#number$#");
  });
});

describe("arrays", () => {
  test("sparse array length matches emitted elements", () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(json2emap({ a: [1, , 3] })).toEqual(
      "l$#4$#v$#k0$#a.length$#v0$#3$#t0$#number$#k1$#a_0_$#v1$#1$#t1$#number$#k2$#a_1_$#v2$#$#t2$#any$#k3$#a_2_$#v3$#3$#t3$#number$#"
    );
  });

  test("nested arrays", () => {
    expect(json2emap({ a: [[1]] })).toEqual(
      "l$#3$#v$#k0$#a.length$#v0$#1$#t0$#number$#k1$#a_0_.length$#v1$#1$#t1$#number$#k2$#a_0__0_$#v2$#1$#t2$#number$#"
    );
  });
});

describe("value types", () => {
  test("null, boolean and float", () => {
    expect(json2emap({ n: null, b: false, f: 1.5 })).toEqual(
      "l$#3$#v$#k0$#n$#v0$#null$#t0$#any$#k1$#b$#v1$#false$#t1$#bool$#k2$#f$#v2$#1.5$#t2$#number$#"
    );
  });
});

describe("objects", () => {
  test("an object with a numeric length key is not treated as array-like", () => {
    expect(json2emap({ a: { length: 2, b: 1 } })).toEqual(
      "l$#2$#v$#k0$#a.length$#v0$#2$#t0$#number$#k1$#a.b$#v1$#1$#t1$#number$#"
    );
  });

  test("objects with null prototype are treated as objects", () => {
    const obj = Object.create(null);
    obj.a = 1;
    expect(json2emap(obj)).toEqual("l$#1$#v$#k0$#a$#v0$#1$#t0$#number$#");
  });

  test("non-plain objects are stringified as leaf values", () => {
    expect(json2emap({ m: new Map(), u: undefined, z: -0 })).toEqual(
      "l$#3$#v$#k0$#m$#v0$#[object Map]$#t0$#any$#k1$#u$#v1$#$#t1$#any$#k2$#z$#v2$#-0$#t2$#number$#"
    );
  });
});
