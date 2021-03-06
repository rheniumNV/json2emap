[English](README.md) | [日本語](README.ja.md)

# json2emap

Convert Json to Emap string.
Emap is a data format designed to be easily parsed by [Neos Metaverse](https://neos.com/).

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
l$#4$#v$#k0$#length$#v0$#3$#t0$#number$#k1$#_0_$#v1$#1$#t1$#number$#k2$#_1_$#v2$#2$#t2$#number$#k3$#_2_$#v3$#3$#t3$#number$#
l$#3$#k0$#a$#v0$#123$#t0$#number$#k1$#b$#v1$#Hello$#t1$#string$#k2$#c$#v2$#World$#t2$#string$#
l$#6$#k0$#a.length$#v0$#2$#t0$#number$#k1$#a_0_$#v1$#Hello$#t1$#string$#k2$#a_1_$#v2$#World$#t2$#string$#k3$#b.length$#v3$#1$#t3$#number$#k4$#b_0_.c$#v4$#1$#t4$#number$#k5$#b_0_.d$#v5$#2$#t5$#number$#
```

## How to use Emap in Neos

There are two main ways to use Emap strings in Neos.
Using DynamicVariable is recommended because it can be handled mechanically.

- Using DynamicVariable
- Extracting directly from strings

You can find a sample in the public folder.
(You can paste the following link in Neos, and it will appear as a public folder.)

> neosrec:///G-Shared-Project-rheni/R-166bcbdf-331a-4abc-9f27-8604bbf0de47

### Using DynamicVariable

Write to DynamicVariable

![](https://user-images.githubusercontent.com/71165146/154020472-0fe7b6f9-b11b-4a4e-969d-84f5943b1747.jpg)

Read from DynamicVariable

![](https://user-images.githubusercontent.com/71165146/154020790-ff6c175a-3e4c-4525-8807-57138b891b13.jpg)

### Extracting directly from strings

You can retrieve a specific value and its type based on a key.

![image](https://user-images.githubusercontent.com/71165146/155488876-96c1a261-b3c8-48f4-b50f-91d36132c11d.png)

※0.2.0 よりも古いバージョンの Emap 文字列では Key と Value の順番が違うためこの方法では読み込めません。

## Steps to convert from Json to Emap

Let's convert the following JSON.

```
{
  "id": 123,
  "name": "rhenium",
  "isPublic": true,
  "accounts": [
    {
      "type": "github",
      "link": "https://github.com/rheniumNV"
    },
    {
      "type": "twitter",
      "link": "https://twitter.com/rhenium_nv"
    }
  ]
}
```

Enumerate all paths.
We add length to the list, and each path is represented as hoge_0\_ instead of hoge[0] (because Neos DynamicVariable keys cannot use []).
(This is because Neos DynamicVariable does not allow [] as a key.)

```
[
  "id": 123,
  "name": "rhenium",
  "isPublic": true,
  "accounts.length": 2,
  "accounts_0_.type": "github",
  "accounts_0_.link": "https://github.com/rheniumNV"
  "accounts_1_.type", "twitter",
  "accounts_1_.link", "https://twitter.com/rhenium_nv",
]
```

For each path, add the corresponding value and its type.

```
[
  {
    "key": "id",
    "value": 123,
    "type": "number"
  },
  {
    "key": "name"
    "value": "rhenium",
    "type": "string"
  },
  {
    "key": "isPublic",
    "value": true,
    "type": "bool"
  },
  {
    "key": "accounts.length",
    "value": 2,
    "type": "number"
  },
  {
    "key": "accounts_0_.type",
    "value": "github",
    "type": "string"
  },
  {
    "key": "accounts_0_.link",
    "value": "https://github.com/rheniumNV",
    "type": "string"
  },
  {
    "key": "accounts_1_.type",
    "value": "twitter",
    "type": "string"
  },
  {
    "key": "accounts_1_.link",
    "value": "https://twitter.com/rhenium_nv",
    "type": "string"
]
```

Make it flat.
Each key is abbreviated to a single character and an index is added.
Also, put the total length in l.

```
key->k
value=->v
type->t
```

```
{
  "l": 8,

  "k0": "id",
  "v0": "123",
  "t0": "number",

  "k1": "name",
  "v1": "rhenium",
  "t1": "string",

  "k2": "isPublic",
  "v2": "true",
  "t2": "bool",

  "k3": "accounts.length",
  "v3": "2",
  "t3": "number",

  "k4": "accounts_0_.type",
  "v4": "github",
  "t4": "string",

  "k5": "accounts_0_.link",
  "v5": "https://github.com/rheniumNV",
  "t5": "string",

  "k6": "accounts_1_.type",
  "v6": "twitter",
  "t6": "string",

  "k7": "accounts_1_.link",
  "v7": "https://twitter.com/rhenium_nv",
  "t7": "string",
}
```

Make it a string.

Remove " and {}.
Replace :and , with $#.

Put v$# between l and the next character.
(This is to maintain compatibility with the logic that handles older versions of Emap.)

In this case, if \\\\ or $# appears in key or value, replace it as follows

```
\ -> \\
$# -> $\#
```

```
l $# 8 $#

v$#

k0 $# id $#
v0 $# 123 $#
t0 $# number $#

k1 $# name $#
v1 $# rhenium $#
t1 $# string $#

k2 $# isPublic $#
v2 $# true $#
t2 $# bool $#

k3 $# accounts.length $#
v3 $# 2 $#
t3 $# number $#

k4 $# accounts_0_.type $#
v4 $# github $#
t4 $# string $#

k5 $# accounts_0_.link $#
v5 $# https://github.com/rheniumNV $#
t5 $# string $#

k6 $# accounts_1_.type $#
v6 $# twitter $#
t6 $# string $#

k7 $# accounts_1_.link $#
v7 $# https://twitter.com/rhenium_nv $#
t7 $# string $#
```

In fact, there are no spaces or line breaks, so it looks like this

```
l$#8$#v$#k0$#id$#v0$#123$#t0$#number$#k1$#name$#v1$#rhenium$#t1$#string$#k2$#isPublic$#v2$#true$#t2$#bool$#k3$#accounts.length$#v3$#2$#t3$#number$#k4$#accounts_0_.type$#v4$#github$#t4$#string$#k5$#accounts_0_.link$#v5$#https://github.com/rheniumNV$#t5$#string$#k6$#accounts_1_.type$#v6$#twitter$#t6$#string$#k7$#accounts_1_.link$#v7$#https://twitter.com/rhenium_nv$#t7$#string$#
```

It is now complete.

### Example of escaping

```
{
  "k0": "\test",
  "v0": "$#value"
}
-> k0$#\\test$#v0$#$\#value$#
```
