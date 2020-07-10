const authentication = async(ctx: any, next: any) => {
  let token: string | null = ctx.request.header.authorization || null;
  ctx.assert(token, 401, '使用者尚未登入，請登入！');
  token = token ? token.replace(/^Bearer /,'') : null
  ctx.assert(token === '596184', 401, '身份驗證有誤，請重新登入！')
  await next()
}

export default authentication