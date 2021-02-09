<template>
  <v-toolbar-items>
    <ul>
      <li>
        <v-btn text to="/2020" color="white">2020</v-btn>
        <v-btn text to="/2019" color="white">2019</v-btn>
        <v-btn text to="/2018" color="white">2018</v-btn>
        <v-btn text to="/2017" color="white">2017</v-btn>
        <v-btn text to="/2016" color="white">2016</v-btn>
      </li>
    </ul>
  </v-toolbar-items>


  <!-- <ol class="years"> -->
    <!-- <li v-for="item in years">
        <a href="#">
            {{ exportYear(item) }}
        </a>
    </li> -->
  <!-- </ol> -->
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