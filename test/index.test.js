const json2emap = require("../index");
const fs = require("fs");

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

test("J2E-copy", () => {
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
const json1res = fs.readFileSync("./test/test1.result").toString();

test("J2E-2", () => {
  expect(json2emap(json1)).toEqual(json1res);
});
