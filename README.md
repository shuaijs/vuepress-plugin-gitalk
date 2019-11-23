# @shuaijs/vuepress-plugin-gitalk

## 介绍

vuepress-plugin-gitalk

## 安装

```bash
yarn add @shuaijs/vuepress-plugin-gitalk
# or
npm install @shuaijs/vuepress-plugin-gitalk --save
```

------------

## 使用

在配置文件中引入 `vuepress-plugin-gitalk`

```javascript
module.exports = {
  plugins: [
    [
      '@shuaijs/gitalk', {
          // GitHub Application Client ID.
          clientID: '',
          // GitHub Application Client Secret.
          clientSecret: '',
          // GitHub repository. 存储评论的 repo
          repo: '',
          // GitHub repository 所有者，可以是个人或者组织。
          owner: '',
          // GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)。(不配置默认是owner配置)
          admin: [''],
      }
    ],
  ],
}
```
