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
    "l$#7$#$#k0v0$#123$#id$#t0$#number$#$#k1v1$#rhenium$#name$#t1$#string$#$#k2v2$#2$#sns.length$#t2$#number$#$#k3v3$#twitter$#sns_0_.type$#t3$#string$#$#k4v4$#@rhenium_vrc$#sns_0_.id$#t4$#string$#$#k5v5$#discord$#sns_1_.type$#t5$#string$#$#k6v6$#rhenium_75_#1015$#sns_1_.id$#t6$#string$#"
  );
});

test("J2E-copy", () => {
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
    "l$#7$#$#k0v0$#123$#id$#t0$#number$#$#k1v1$#rhenium$#name$#t1$#string$#$#k2v2$#2$#sns.length$#t2$#number$#$#k3v3$#twitter$#sns_0_.type$#t3$#string$#$#k4v4$#@rhenium_vrc$#sns_0_.id$#t4$#string$#$#k5v5$#discord$#sns_1_.type$#t5$#string$#$#k6v6$#rhenium_75_#1015$#sns_1_.id$#t6$#string$#"
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
    "l$#7$#$#k0v0$#123$#id$#t0$#number$#$#k1v1$#rhenium$\\#$#\\\\name$#t1$#string$#$#k2v2$#2$#sns.length$#t2$#number$#$#k3v3$#twitter$#sns_0_.type$#t3$#string$#$#k4v4$#@rhenium_vrc$#sns_0_.id$#t4$#string$#$#k5v5$#discord$#sns_1_.type$#t5$#string$#$#k6v6$#rhenium_75_#1015$#sns_1_.id$#t6$#string$#"
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
    "l$#7$#$#k0v0$#123$#id$#t0$#number$#$#k1v1$#rhenium$\\#$#\\\\name$#t1$#string$#$#k2v2$#2$#sns.length$#t2$#number$#$#k3v3$#twitter$#sns_0_.typ\\\\e\\\\$#t3$#string$#$#k4v4$#@r$\\#he$\\#nium_vrc$#sns_0_.id$#t4$#string$#$#k5v5$#discord$#sns_1_.type$#t5$#string$#$#k6v6$#rhenium_75_#1015$#sns_1_.id$#t6$#string$#"
  );
});

test("J2E-return-whitespace", () => {
  expect(json2emap({ id: "\n \n" })).toEqual(
    "l$#1$#$#k0v0$#\n \n$#id$#t0$#string$#"
  );
});

const json1 = require("./test1.json");
const json1res = fs.readFileSync("./test/test1.result").toString();
test("J2E-2", () => {
  expect(json2emap(json1)).toEqual(json1res);
});
