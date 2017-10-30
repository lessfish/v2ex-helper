// 对话详情
export default function(message, sendResponse) {
  let {floorOwner, replyUser, topicId} = message
  let conversations = [] // 对话详情数据，sendResponse() 返回的数据
  // 去除缓存影响，但是 api 一小时只能调用 120 次
  let api = 'https://www.v2ex.com/api/replies/show.json?topic_id=' + topicId + '&rdm=' + (+new Date) 
  
  fetch(api)
    .then(res => res.json())
    .then(results => {
      const pattern = /@<a target="_blank" href="\/member\/.+?">(.+?)<\/a>/g // 获取层主回复用户名

      // 遍历回复数据
      results.forEach(res => {
        let replyContent = res.content_rendered // 该楼层回复内容
        let matches = replyContent.match(pattern) // replyContent 中有几个 @
        let _floorOwner = res.member.username // 层主
        let avatarsUrl = res.member.avatar_normal // 层主头像

        // replyContent 中有 >=1 个 @ 时
        if (matches && matches.length >= 1) {
          let _replyUser = [] // 层主回复的用户数组
          let matching;
          
          // 遍历，找到 @ 的用户，即层主回复的用户 
          do {
            matching = pattern.exec(replyContent);
            if (matching) {
              _replyUser.push(matching[1])
            }
          } while (matching !== null)

          if ((_floorOwner === floorOwner && _replyUser.includes(replyUser)) ||
              (_floorOwner === replyUser && _replyUser.includes(floorOwner))) {
            conversations.push({from: _floorOwner, replyContent, avatarsUrl})
          } 
        }

        // 单纯的回复楼层（回复中没有 @）
        if (!matches) {
          if (( _floorOwner === floorOwner) ||
              (_floorOwner === replyUser)) {
            conversations.push({from: _floorOwner, replyContent, avatarsUrl})
          }
        }
      })

      sendResponse({conversations: conversations})
    })
}