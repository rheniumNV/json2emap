const json2emap = require("../index");
const fs = require("fs");

test("J2E", () => {
  expect(
    json2emap({
      id: 123,
      name: "rhenium",
      sns: [
        { type: "twitter", id: "@rhenium_vrc" },
        { type: "discord", id: "rhenium_75_#1015" },
      ],
    })
  ).toEqual(
    "l$#7$#v0$#123$#k0$#id$#t0$#number$#v1$#rhenium$#k1$#name$#t1$#string$#v2$#2$#k2$#sns.length$#t2$#number$#v3$#twitter$#k3$#sns_0_.type$#t3$#string$#v4$#@rhenium_vrc$#k4$#sns_0_.id$#t4$#string$#v5$#discord$#k5$#sns_1_.type$#t5$#string$#v6$#rhenium_75_#1015$#k6$#sns_1_.id$#t6$#string$#"
  );
});

test("J2E-escape", () => {
  expect(
    json2emap({
      id: 123,
      "\\name": "rhenium$#",
      sns: [
        { type: "twitter", id: "@rhenium_vrc" },
        { type: "discord", id: "rhenium_75_#1015" },
      ],
    })
  ).toEqual(
    "l$#7$#v0$#123$#k0$#id$#t0$#number$#v1$#rhenium$\\#$#k1$#\\\\name$#t1$#string$#v2$#2$#k2$#sns.length$#t2$#number$#v3$#twitter$#k3$#sns_0_.type$#t3$#string$#v4$#@rhenium_vrc$#k4$#sns_0_.id$#t4$#string$#v5$#discord$#k5$#sns_1_.type$#t5$#string$#v6$#rhenium_75_#1015$#k6$#sns_1_.id$#t6$#string$#"
  );
});

test("J2E-escape-multi", () => {
  expect(
    json2emap({
      id: 123,
      "\\name": "rhenium$#",
      sns: [
        { "typ\\e\\": "twitter", id: "@r$#he$#nium_vrc" },
        { type: "discord", id: "rhenium_75_#1015" },
      ],
    })
  ).toEqual(
    "l$#7$#v0$#123$#k0$#id$#t0$#number$#v1$#rhenium$\\#$#k1$#\\\\name$#t1$#string$#v2$#2$#k2$#sns.length$#t2$#number$#v3$#twitter$#k3$#sns_0_.typ\\\\e\\\\$#t3$#string$#v4$#@r$\\#he$\\#nium_vrc$#k4$#sns_0_.id$#t4$#string$#v5$#discord$#k5$#sns_1_.type$#t5$#string$#v6$#rhenium_75_#1015$#k6$#sns_1_.id$#t6$#string$#"
  );
});

test("J2E-return-whitespace", () => {
  expect(json2emap({ id: "\n \n" })).toEqual(
    "l$#1$#v0$#\n \n$#k0$#id$#t0$#string$#"
  );
});

const json1 = require("./test1.json");
const json1res = fs.readFileSync("./test/test1.result").toString();
test("J2E-2", () => {
  expect(json2emap(json1)).toEqual(json1res);
});
