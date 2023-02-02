<template>
<div class="article-list">
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="refreshSucces">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
  >
  <van-cell v-for="article,index in list" :key="index" :title="article.title" />
</van-list>
</van-pull-refresh>
</div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据数组
      loading: false, // 控制加载中loading状态
      finished: false,
      timestamp: null, // 控制数据加载结束的状态
      error: false, // 控制失败的提示状态列表
      count: 0,
      isLoading: false,
      refreshSucces: '刷新成功'
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发onload
    // onLoad () {
    //   // 异步更新数据
    //   // console.log('onload');
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout (() => {
    //     //请求结果数据放到list数组
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     // // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        if (Math.random() > 0.5) {
          JSON.parse('dsnajndjsa')
        }

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSucces = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        console.log('请求失败')
      }
    }
  }
}
</script>

<style>

</style>
