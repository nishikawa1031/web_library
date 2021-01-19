<template>
  <ol class="years">
    <li v-for="item in years">
        <a href="#">
            {{ exportYear(item) }}
        </a>
    </li>
  </ol>
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
    .years {
        list-style-type: none;
        text-align: left;
        background-color: #C4C4C4;
        display: inline-block;
        padding: 10px 30px;
        font-size: 20px;
    }
    .years li {
        margin: 5px 0;
    }
    .years li a {
        color: black;
        text-decoration: none;
    }
</style>