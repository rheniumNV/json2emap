# json2emap

Json を emap 形式に変換します。
emap とは NeosVR でパースしやすいように考えて作ったデータ形式です。

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
