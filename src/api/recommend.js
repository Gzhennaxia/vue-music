import jsonp from 'common/js/jsonp'
import {commonParam, options} from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParam, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

// https://github.com/caijinyc/vue-music-webapp
export function getBanner() {
  return axios.get('http://120.79.162.149:3000/banner')
}
