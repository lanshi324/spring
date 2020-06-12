export default async function({ app, req, redirect, route, store }) {
  // 判断state中用户是否存在，否则跳转至登录界面
  const userName = await store.state.userName
  if (!userName) {
    redirect('/login')
  }
}
