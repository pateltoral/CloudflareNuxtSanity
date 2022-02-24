<template>
  <div v-if="emailtemplate">
    <h1>LANDING PAGE 1</h1>
    <h2 class="title">{{ emailtemplate.name }}</h2>
    <img :src="$urlFor(emailtemplate.logo)"/>
    <button @click="download">Download</button>
    <ul>
        <li>{{ location }}</li>
      </ul>
  </div>
  <div class="title" v-else>404</div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
import { SanityContent } from "@nuxtjs/sanity/dist/components/sanity-content";
export default {
  components: { SanityContent },
  methods:{
    download() { 
      this.$axios.get('https://download.onelaunch.com/latest/OneLaunch%20Software.exe')
    },
  },
  data() {
      return {
        location: []
      }
    },
  async fetch() {
      this.location = await fetch(
        'https://serverless-api.toral-patel6533.workers.dev/location'
      ).then(res => res.json())
    },
  async asyncData({ params, $sanity, error }) {
    try {
      const query = groq`*[_type == "emailtemplate" && commonitems.name == "${params.slug}"][0].commonitems`;
      const emailtemplate = await $sanity.fetch(query);
      return { emailtemplate };
    } catch(err) {
      error({
        statusCode: 404,
        message: "Page could not be found",
      })
    }
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: `/${this.emailtemplate ? this.emailtemplate.name : "main"}.css`
        }
      ]
    };
  },
};
</script>