function integrateGitalk(router) {
  const linkGitalk = document.createElement('link')
  linkGitalk.href = 'https://unpkg.com/gitalk/dist/gitalk.css'
  linkGitalk.rel = 'stylesheet'
  const scriptGitalk = document.createElement('script')
  document.body.appendChild(linkGitalk)
  scriptGitalk.src = 'https://unpkg.com/gitalk/dist/gitalk.min.js'
  document.body.appendChild(scriptGitalk)

  router.afterEach((to, from) => {
    // 页面滚动，hash值变化，也会触发afterEach钩子，避免重新渲染
    if (to.path === from.path) return
    // 已被初始化则根据页面重新渲染 评论区
    if (scriptGitalk.onload) {
      renderGitalk()
    } else {
      scriptGitalk.onload = () => {
        const commentsContainer = document.createElement('div')
        commentsContainer.id = 'comments-container'
        commentsContainer.classList.add('content')
        const {selector = '.page'} = GITALK_CONFIG;
        const $page = document.querySelector(selector)
        if ($page) {
          $page.appendChild(commentsContainer)
          renderGitalk()
        }
      }
    }
  })

  function renderGitalk() {
    var id = location.pathname
    if (location.pathname.length > 50) {
      id = location.pathname.replace(/\/\d+\/\d+\/\d+\//, '').replace('/', '').substring(0, 50)
    }
    const {
      clientID,
      clientSecret,
      repo,
      owner,
      admin
    } = GITALK_CONFIG;
    const gitalk = new Gitalk({
      clientID,
      clientSecret,
      repo,
      owner,
      admin: admin ? admin : [owner],
      // Ensure uniqueness and length less than 50
      id,
      title: document.title.split('|')[0],
      distractionFreeMode: false
    })
    gitalk.render('comments-container')
  }
}

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  try {
    // 生成静态页时在node中执行，没有document对象
    document && integrateGitalk(router)
  } catch (e) {
    console.error(e.message)
  }
}