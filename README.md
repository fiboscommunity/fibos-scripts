# fibos 使用脚本

- 系统环境 Linux or Darwin(MacOS)

## 安装 fibos

1. 如果您当前的机器环境不存在 fibos 二进制程序, 请执行以下命令安装 fibos.

```bash
curl -s https://fibos.io/download/installer.sh | sh
```

## 安装依赖

1. 执行以下命令安装项目的 node_modules 依赖包.

```bash
fibos --install
```

## 运行脚本

1. 执行以下命令运行脚本.

```bash
# 使用该脚本对多签提案进行投票.
fibos ./approval.js
```