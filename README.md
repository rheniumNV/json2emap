# json2emap

Json を emap 形式に変換します。
emap とは NeosVR でパースしやすいように考えて作ったデータ形式です。

## 使い方

```
npm install git+https://github.com/rheniumNV/json2emap.git
```

```
const json2emap = require("emap");

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
l$#4$#v.0$#1$#k.0$#0$#t.0$#number$#v.1$#2$#k.1$#1$#t.1$#number$#v.2$#3$#k.2$#2$#t.2$#number$#v.3$#3$#k.3$#length$#t.3$#number$#
l$#3$#v.0$#123$#k.0$#a$#t.0$#number$#v.1$#Hello$#k.1$#b$#t.1$#string$#v.2$#World$#k.2$#c$#t.2$#string$#
l$#6$#v.0$#Hello$#k.0$#a_0_$#t.0$#string$#v.1$#World$#k.1$#a_1_$#t.1$#string$#v.2$#2$#k.2$#a.length$#t.2$#number$#v.3$#1$#k.3$#b_0_.c$#t.3$#number$#v.4$#2$#k.4$#b_0_.d$#t.4$#number$#v.5$#1$#k.5$#b.length$#t.5$#number$#
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
