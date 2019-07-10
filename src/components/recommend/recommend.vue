<template>
  <div class="recommend">
    <div class="recommend-content">
<!--      <div v-if="banners.length" class="slider-wrapper">-->
<!--        <slider>-->
<!--          <div v-for="item in banners" :key="item.id">-->
<!--            <img :src="item.picUrl"/>-->
<!--          </div>-->
<!--        </slider>-->
<!--      </div>-->
      <div class="slider-wrapper">
        <slider>
          <div><img src="/static/images/banner/109951164176047831.jpg" alt=""></div>
          <div><img src="/static/images/banner/41073985723323.jpeg" alt=""></div>
        </slider>
      </div>
    </div>
     <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import {getRecommend, getBanner, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'recommend',
  created() {
    // this._getBanner()
    // this._getRecommend()
    this._getDiscList()
  },
  data () {
    return {
      recommends: [],
      banners: []
    }
  },
  methods: {
    _getBanner() {
      getBanner().then((res) => {
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.banners = res.banners.splice(4)
        }
      })
    },
    _getRecommend () {
      getRecommend().then((res) => {
        // console.log(res)
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          console.log('res.data.list', res.data.list)
          // this.discList = res.data.list
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    tottom: 0
</style>
