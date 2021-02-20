<template>
  <v-toolbar-items>
    <ul>
      <li v-for="item in years" :key="item">
        <v-btn text :to="'/'+ item" color="black">
            {{ exportYear(item) }}
        </v-btn>
      </li>
    </ul>
  </v-toolbar-items>


  <!-- <ol class="years">
    <li v-for="item in years">
        <a href="#">
            {{ exportYear(item) }}
        </a>
    </li>
  </ol> -->
</template>

<script>
export default {
  data () {
    return {
        // 存在するページの西暦を入れた配列
        years: [
            2020,
            2019,
            2018,
            2017,
            2016,
            2015,
            2014,
            2013,
            2012,
            2011,
            2010,
            2009,
            2008,
            2007,
            2006,
            2005,
            2004,
            2003,
            2002,
            2001,
            2000
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


<style lang="scss" scoped>
  li {
    list-style: none;
    display: list-item;
  }
  .card-content {
    list-style-type: unset;
  }
  .years {
      list-style-type: none;
      text-align: left;
      background-color: transparent;
      display: inline-block;
      padding: 10px 10px;
      font-size: 18px;
  }
  .years li {
      margin: 5px 0;
  }
  .years li a {
      color: white;
      text-decoration: none;
  }
</style>