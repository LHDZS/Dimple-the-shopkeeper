let serverPath = 'https://jujiuwo.xiaoniren.cn'
export function post (url, body) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url,
      data: body,
      method: 'POST',
      // header: {
      //   'content-type': 'application/json'
      // },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(serverPath + url)
        resolve(res.data)
      },
      fail (ret) {
        reject(ret)
      }
    })
  })
}
export function get (url, body) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url,
      data: body,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(serverPath + url)
        resolve(res.data)
      },
      fail (ret) {
        reject(ret)
      }
    })
  })
}
