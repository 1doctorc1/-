// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  let collect = event.collection;
  if (!collect)
    collect = 'copyman';
  return await cloud.database().collection(collect).where({
    blush: event.blush,
    open_mouth: event.open_mouth,
    smile: event.smile,
  }).get()
}