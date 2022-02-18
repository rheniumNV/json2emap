# json2emap

Json を emap 文字列に変換します。
emap は [Neos Metaverse](https://neos.com/) でパースしやすいように考えて作ったデータ形式です。

Convert Json to emap string.
emap is a data format designed to be easily parsed by [Neos Metaverse](https://neos.com/).

## How to use

```
npm install json2emap
```

sample..s

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

Output

```
l$#4$#v0$#3$#k0$#length$#t0$#number$#v1$#1$#k1$#_0_$#t1$#number$#v2$#2$#k2$#_1_$#t2$#number$#v3$#3$#k3$#_2_$#t3$#number$#
l$#3$#v0$#123$#k0$#a$#t0$#number$#v1$#Hello$#k1$#b$#t1$#string$#v2$#World$#k2$#c$#t2$#string$#
l$#6$#v0$#2$#k0$#a.length$#t0$#number$#v1$#Hello$#k1$#a_0_$#t1$#string$#v2$#World$#k2$#a_1_$#t2$#string$#v3$#1$#k3$#b.length$#t3$#number$#v4$#1$#k4$#b_0_.c$#t4$#number$#v5$#2$#k5$#b_0_.d$#t5$#number$#
```

## How to parse in Neos

パブリックフォルダにサンプル LogiX が置いてあります。
（以下のリンクを Neos 内でペーストするとパブリックフォルダとして出てきます。）

You can find a sample LogiX in the public folder.
(If you paste the following link in Neos, it will come up as a public folder.)

> neosrec:///G-Shared-Project-rheni/R-166bcbdf-331a-4abc-9f27-8604bbf0de47

### Writing to DynamicVariable

![](https://user-images.githubusercontent.com/71165146/154020472-0fe7b6f9-b11b-4a4e-969d-84f5943b1747.jpg)

### Read from DynamicVariable

![](https://user-images.githubusercontent.com/71165146/154020790-ff6c175a-3e4c-4525-8807-57138b891b13.jpg)

## json -> emap conversion process

### Sample Json

```
{
  "id": 123,
  "name": "rhenium",
  "sns": [
    {
      "type": "twitter",
      "id": "@rhenium_nv"
    },
    {
      "type": "discord",
      "id": "rhenium_75_#1015"
    }
  ]
}
```

### Json representation of emap format

```
{
  "l": 7,

  "v0": "123",
  "k0": "id",
  "t0": "number",

  "v1": "rhenium",
  "k1": "name",
  "t1": "string",

  "v2": "2",
  "k2": "sns.length",
  "t2": "number",

  "v3": "twitter",
  "k3": "sns_0_.type",
  "t3": "string",

  "v4": "@rhenium_nv",
  "k4": "sns_0_.id",
  "t4": "string",

  "v5": "discord",
  "k5": "sns_1_.type",
  "t5": "string",

  "v6": "rhenium_75#1015",
  "k6": "sns_1_.id",
  "t6": "string",
}
```

### Convert to emap string

```
  l $# 7 $#

  v0 $# 123 $#
  k0 $# id $#
  t0 $# number $#

  v1 $# rhenium $#
  k1 $# name $#
  t1 $# string $#

  v2 $# 2 $#
  k2 $# sns.length $#
  t2 $# number $#

  v3 $# twitter $#
  k3 $# sns_0_.type $#
  t3 $# string $#

  v4 $# @rhenium_nv $#
  k4 $# sns_0_.id $#
  t4 $# string $#

  v5 $# discord $#
  k5 $# sns_1_.type $#
  t5 $# string $#

  v6 $# rhenium_75#1015 $#
  k6 $# sns_1_.id $#
  t6 $# string $#
```

実際は改行・空白なし
Actually, no line breaks and spaces

```
l$#7$#v0$#123$#k0$#id$#t0$#number$#v1$#rhenium$#k1$#name$#t1$#string$#v2$#2$#k2$#sns.length$#t2$#number$#v3$#twitter$#k3$#sns_0_.type$#t3$#string$#v4$#@rhenium_nv$#k4$#sns_0_.id$#t4$#string$#v5$#discord$#k5$#sns_1_.type$#t5$#string$#v6$#rhenium_75#1015$#k6$#sns_1_.id$#t6$#string$#
```

t{index}, v{index} の値に次の文字列が出てきたらエスケープする。
If the following strings appear in the values of t{index} and v{index}, escape them.

```
\ -> \\
$# -> $\#
```

Example of escaping

```
{
  "k0": "\test",
  "v0": "$#value"
}
-> k0$#\\test$#v0$#$\#value$#
```
