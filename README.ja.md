[English](README.md) | [日本語](README.ja.md)

# json2emap

Json を Emap 文字列に変換します。
Emap は [Neos Metaverse](https://neos.com/) でパースしやすいように考えて作ったデータ形式です。

## 使い方

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

## Neos での Emap の使い方

Emap 文字列の Neos 内での利用方法は主に 2 種類あります。
DynamicVariable を利用するほうが機械的に処理できるためおすすめです。

- DynamicVariable を利用する
- 文字列から直接取り出す

パブリックフォルダにサンプルが置いてあります。
（以下のリンクを Neos 内でペーストするとパブリックフォルダとして出てきます。）

> neosrec:///G-Shared-Project-rheni/R-166bcbdf-331a-4abc-9f27-8604bbf0de47

### DynamicVariable を利用する

DynamicVariable への書き込み

![](https://user-images.githubusercontent.com/71165146/154020472-0fe7b6f9-b11b-4a4e-969d-84f5943b1747.jpg)

DynamicVariable からの読み込み

![](https://user-images.githubusercontent.com/71165146/154020790-ff6c175a-3e4c-4525-8807-57138b891b13.jpg)

### 文字列から直接取り出す

キーを元に特定の値とその型を取得できます。

![image](https://user-images.githubusercontent.com/71165146/155488876-96c1a261-b3c8-48f4-b50f-91d36132c11d.png)

※0.2.0 よりも古いバージョンの Emap 文字列では Key と Value の順番が違うためこの方法では読み込めません。

## Json から Emap に変換される手順

以下の JSON を変換してみます。

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

全てのパスを列挙します。
リストには length を追加し、それぞれのパスは hoge[0] ではなく hoge_0\_ と表現します。
（Neos の DynamicVariable のキーには[]が使えないためです。）

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

それぞれのパスに対応する値とその型を追加します。

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

フラットにします。
各キーは 1 文字に省略しインデックスを追加します。
また、全体の長さを l に入れます。

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

文字列にします。

"と{}は取り除きます。
:と,は$#に置換します。

l とそれ以降の文字の間に v$#を入れます。
（これは古いバージョンの Emap を処理するロジックとの互換性を保つためのものです）

この際に\\\\や$#が key か value に出てきた場合は以下のように置換します。

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

実際は空白や改行はないので以下のようになります。

```
l$#8$#v$#k0$#id$#v0$#123$#t0$#number$#k1$#name$#v1$#rhenium$#t1$#string$#k2$#isPublic$#v2$#true$#t2$#bool$#k3$#accounts.length$#v3$#2$#t3$#number$#k4$#accounts_0_.type$#v4$#github$#t4$#string$#k5$#accounts_0_.link$#v5$#https://github.com/rheniumNV$#t5$#string$#k6$#accounts_1_.type$#v6$#twitter$#t6$#string$#k7$#accounts_1_.link$#v7$#https://twitter.com/rhenium_nv$#t7$#string$#
```

これで完成です。

### エスケープの例

```
{
  "k0": "\test",
  "v0": "$#value"
}
-> k0$#\\test$#v0$#$\#value$#
```
