# json2emap

Json を emap 形式に変換します。
emap とは NeosVR でパースしやすいように考えて作ったデータ形式です。

## 使い方

```
npm install git+https://github.com/rheniumNV/json2emap.git
```

```
const json2emap = require("json2emap");

console.log(json2emap([1, 2, 3]));

console.log(json2emap({ a: 123, b: "Hello", c: "World" }));

console.log(
  json2emap({
    a: ["Hello", "World"],
    b: [{ c: 1, d: 2 }],
  })
);
```

出力

```
l$#4$#v0$#3$#k0$#length$#t0$#number$#v1$#1$#k1$#_0_$#t1$#number$#v2$#2$#k2$#_1_$#t2$#number$#v3$#3$#k3$#_2_$#t3$#number$#
l$#3$#v0$#123$#k0$#a$#t0$#number$#v1$#Hello$#k1$#b$#t1$#string$#v2$#World$#k2$#c$#t2$#string$#
l$#6$#v0$#2$#k0$#a.length$#t0$#number$#v1$#Hello$#k1$#a_0_$#t1$#string$#v2$#World$#k2$#a_1_$#t2$#string$#v3$#1$#k3$#b.length$#t3$#number$#v4$#1$#k4$#b_0_.c$#t4$#number$#v5$#2$#k5$#b_0_.d$#t5$#number$#
```

# emap

## サンプル Json

```
{
  "id": 123,
  "name": "rhenium",
  "sns": [
    {
      "type": "twitter",
      "id": "@rhenium_vrc"
    },
    {
      "type": "discord",
      "id": "rhenium_75_#1015"
    }
  ]
}
```

### emap 形式を Json で表現

```
{
  "l": 7,

  "k0": "id",
  "t0": "int",
  "v0": "123",

  "k1": "name",
  "t1": "string",
  "v1": "rhenium",

  "k2": "sns.length",
  "t2": "int",
  "v2": "2",

  "k3": "sns_0_.type",
  "t3": "string",
  "v3": "twitter",

  "k4": "sns_0_.id",
  "t4": "string",
  "v4": "@rhenium_vrc",

  "k5": "sns_1_.type",
  "t5": "string",
  "v5": "discord",

  "k6": "sns_1_.id",
  "t6": "string",
  "v6": "rhenium_75_#1015",
}
```

## emap 文字列へ変換

```
  l $# 7 $#

  k0 $# id $#
  t0 $# int $#
  v0 $# 123 $#

  k1 $# name $#
  t1 $# string $#
  v1 $# rhenium $#

  k2 $# sns.length $#
  t2 $# int $#
  v2 $# 2 $#

  k3 $# sns_0_.type $#
  t3 $# string $#
  v3 $# twitter $#

  k4 $# sns_0_.id $#
  t4 $# string $#
  v4 $# @rhenium_vrc $#

  k5 $# sns_1_.type $#
  t5 $# string $#
  v5 $# discord $#

  k6 $# sns_1_.id $#
  t6 $# string $#
  v6 $# rhenium_75#1015 $#
```

実際は改行・空白なし

```
l$#7$#k0$#id$#t0$#int$#v0$#123$#k1$#name$#t1$#string$#v1$#rhenium$#k2$#sns.length$#t2$#int$#v2$#2$#k3$#sns_0_.type$#t3$#string$#v3$#twitter$#k4$#sns_0_.id$#t4$#string$#v4$#@rhenium_vrc$#k5$#sns_1_.type$#t5$#string$#v5$#discord$#k6$#sns_1_.id$#t6$#string$#v6$#rhenium_75#1015$#
```

t{index}, v{index} の値に次の文字列が出てきたらエスケープする。

```
\ -> \\
$# -> $\#
```

エスケープの例

```
{
  "k0": "\test",
  "v0": "$#value"
}
-> k0$#\\test$#v0$#$\#value$#
```
