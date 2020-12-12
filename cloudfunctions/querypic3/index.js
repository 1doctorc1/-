// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let collect = event.collection;
  if (!collect)
    collect = 'copyman3';
  return await cloud.database().collection(collect).where({
    armor: event.armor,
    female: event.female,
  }).get();
  /* const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  } */
}