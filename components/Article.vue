<template>
    <div class="article">
        <div class="article-main">
            <img src="">
            <!-- <p>{{exportYear(2020)}}</p> -->
            <p>by {{ authorName }}</p>
        </div>
        <div class="article-sub">
            <span>閲覧数　{{ view }}</span>
            <span>like {{ like }}</span>
        </div> 
    </div>
</template>

<script>
export default {
  data () {
    return {
        // 存在するページの西暦を入れた配列
        years: [
            1995,
            1996,
            1997,
            1998,
            1999,
            2000,
            2001,
            2002,
            2003,
            2004,
            2005,
        ]
    };
  },

  methods: {
    // 引数で西暦を受け取り、
    // 2000年（平成12年）の形式の文字列にして返す
    exportYear: function (year) {
        const date = new Date(year, 3, 1);
        const options = {era: 'long'};
        const jaEra = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options).format(date);
        const yearText = year + "年（" + jaEra.slice(0, -4) + "）"
        return yearText
    }
  }
}
</script>


<style>
    .article {
        background-color: #c4c4c4;
        font-size: 25px;
        padding: 10px;
        display: flex;
        position: relative;
        text-align: left;
    }
    .article-main {
        margin: 0 100px 0 0;
    }
    .article-main p:first-of-type {
        margin-left: 80px;
    }
    .article-main p:last-child {
        margin: 50px 0 10px 10px;
    }
    .article-main img {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 50%;
        display: block;
    }
    .article-sub span {
        display: block;
        text-align: right;
    }
    .article-sub span:last-child {
        margin-top: 50px;
    }
</style>



<script>

    export default {
        data () {
            return {
                authorName: "Taro Yamada",
                view: 200,
                like: 100
            }
        }
    }
</script>