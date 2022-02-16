<template>
  <div v-if="emailtemplate">
    <h1>LANDING PAGE 1</h1>
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