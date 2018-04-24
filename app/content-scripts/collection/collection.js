document.querySelector('#Main > div:nth-child(2) > div.topic_buttons > a:nth-child(2)').onclick = () => {
  fetch(location.href, {credentials: "include"})
    .then(res => res.text())
    .then(data => {
      let p = /\/(un)?favorite\/topic\/[0-9]+\?t=[a-z]+/
      let apiUrl = data.match(p)[0]
      location.href = apiUrl
    })
  
  return false
}