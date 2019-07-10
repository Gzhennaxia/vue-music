<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
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
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import {getRecommend, getBanner, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'

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
      banners: [],
      discList: []
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
          // console.log('res.data.list', res.data.list)
          this.discList = res.data.list
        }
      })
    }
  },
  components: {
    Slider,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
</style>
