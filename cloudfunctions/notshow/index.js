// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let collect = event.collection;
  if (!collect) {
    collect = 'user';
  }
  try {
    return await cloud.database().collection(collect).where({
      _id: event.id,
    }).update({
      data: {
        notshow: event.notshow,
      }
    })
  } catch (e) {
    console.log(e);
  }
  /* const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  } */
}