<template>
  <div class="home-container">
    <van-nav-bar
     class="page-nav-bar"
    >
    <van-button slot="title" type="info" size="small" icon="search" round class="search-btn">搜索</van-button>
  </van-nav-bar>
  <van-tabs v-model="active" animated swipeable class="channel-tabs">
  <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
  <article-list :channel="channel"/>
  </van-tab>

  <div slot="nav-right" class="ham">2</div>
</van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .home-container{
  padding-bottom: 50px;
.van-nav-bar__content{
  .van-nav-bar__title{
    max-width: unset;
    .search-btn{
    width: 280px;
    height: 34px;
    background-color: #5babfb;
    border: none;
    font-size: 16px;
    .van-icon{
      font-size: 18px;
      color: white;
    }
  }
  }
}

  /deep/.channel-tabs{
    .van-tab{
      min-width: 80px;
      height: 40px;
      border-right: 1px solid #edeff3;
      font-size: 16px;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 4px;
      width: 20px !important;
      height: 4px;
      background-color: #3296fa;
    }
    .ham{
      position: fixed;
      right: 0;
      width: 30px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity:0.5
    }
    &:before{
      content:"";
      width: 10px;
      height: 100%;
      background-color: pink;
    }
  }
 }
</style>
