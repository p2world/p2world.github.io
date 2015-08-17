```
适用于：有一定git基础，但对git还有些疑惑
```

# 概念

## 三个库

本地库

* 咱们的工作库

远程缓存库

* 存储在本地的远程库的缓存

远程库

* git服务器


## git的工作方式：
* 在本地库写代码，提交到本地，在本地解除冲突。。。 也就是说git就是跑在本地的系统
* 然后把本地库的改动同步到远程库
* 当远程库有更新的时候把它同步到本地库



## commit（名词 版本）

一个commit包含：

* 具体每个文件的改动
* 指向上一个commit的指针
* hash-id
	* 每次生成或修改commit的时候 生成的版本号id，在整个库中唯一


## 分支

一个分支包含

* HEAD指针（本分支最新的commit）

分支的实质

* 从最新的commit找到他的上一个commit 然后一直找下去 就是一个分支

开叉的节点

* 有俩个或更多个commit的上一个指针都指向它

# 一些命令：

```
git branch branch1 #创建一个分支
```

想想内部发生了什么？

* 创建一个分支名为branch1
* 将branch1的指针指向当前分支的最新版本

```
git checkout branch1 #切换到branch1分支  checkout 在git里就是切换的意思
```

### reset
将某个commit（必须是当前分支下的commit）设定为当前分支的最新commit，分为俩种：
* `默认` 只改变log（HEAD指针）不改变文件（常用于将多个commit合并为一个）
* `--hard` 完全变成新commit的状态（包括HEAD指针和文件）

### rebase

当父分支有更新的时候，跟进到父分支的最新版本

将：

```
--o--a--b--c
	 \
	  d--e
```

变为：

```
--o--a--b--c
	        \
	         d--e
```


### 将远程同步到本地

更新缓存库到远程的最新状态

```
git fetch
```

跟进缓存库的代码

```
git rebase origin/master
```

对，没有看错，就是分支操作，因为远程缓存库存在的关系，远程库变成了一个个分支

这两步可以简写为： git pull --rebase origin master


### 将本地同步到远程

## Gerrit

公司的commit新增change-id

* 和hash-id的区别是：当commit修改的时候不变（用于review平台反复review一个commit）

* 将本分支所有未review的commit（根据change-id）发到gerrit平台（为每一个commit生成一个review）
* review不通过或者和最新的master有冲突，可以修改后重新提交
* review获得+2后，可以点击submit，将本次commit加到远程master

## git config

全局conf文件是`~/.gitconfig`，常用设置：

* 简写

```
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
```

* git push 的时候只同步当前分支

```
[push]
    default = simple
```

* 将入库文件的换行符统一成`\n`

```
[core]
    autocrlf = input
```

* 记住https的密码

```
[credential]
    helper = store
```
