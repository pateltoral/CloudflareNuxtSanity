<template>
  <div v-if="emailtemplate">
    <h1>LANDING PAGE 2</h1>
    <h2 class="title">{{ emailtemplate.name }}</h2>
    <img :src="$urlFor(emailtemplate.logo)"/>
  </div>
  <div class="title" v-else>404</div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
import { SanityContent } from "@nuxtjs/sanity/dist/components/sanity-content";
export default {
  components: { SanityContent },
  async asyncData({ params, $sanity }) {
    const query = groq`*[_type == "gamestemplate" && commonitems.name == "${params.slug}"][0].commonitems`;
    const emailtemplate = await $sanity.fetch(query);
    return { emailtemplate };
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