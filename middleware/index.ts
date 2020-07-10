/**
 * 封裝整個 db instance，並定義模型關聯
 */
const middleware = async (ctx: any, next: any) => {
  await next();
};

export default middleware;
