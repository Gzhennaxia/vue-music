<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="banners.length" class="slider-wrapper">
        <slider>
<!--          <div><img src="http://p1.music.126.net/phGLw7jdKIPO5A_jlx9o9w==/109951164176047831.jpg" alt=""></div>-->
          <div v-for="item in banners" :key="item.id">
            <img :src="item.picUrl"/>
          </div>
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
import {getRecommend, getBanner} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'recommend',
  created() {
    this._getBanner()
    // this._getRecommend()
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
