<template>
  <q-page>
    <q-parallax
      class="page-title"
      :height="300"
      :speed="0.5"
      v-if="!store.loading"
    >
      <template v-slot:media>
        <img
          :src="require(`@/assets/images${store.blog.thumbnail}`)"
          alt="background"
          v-if="!store.loading"
        />
      </template>
      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0
          }"
        >
          <div class="text-h3 text-white text-center">
            {{ store.blog.title || "" }}
          </div>
        </div>
        <!-- <h1 class="text-h3 text-white text-center header-content">
          {{ store.blog.title || "" }}
        </h1> -->
      </template>
    </q-parallax>
    <q-skeleton height="300px" square v-else />
    <!-- {{ store.blog.content || "" }} -->
    <div class="blog-detail">
      <div class="q-pt-md q-pb-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el label="Blogs" icon="widgets" to="/blogs" />
          <q-breadcrumbs-el :label="store.blog.title" icon="book" />
        </q-breadcrumbs>
      </div>
      <VueMarkdown v-if="!isLoading">
        {{ store.blog.content }}
      </VueMarkdown>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VueMarkdown from "vue-markdown";
function mapStateToProps(state) {
  const blog = state.Blog.blog.data;
  return {
    loading: state.Blog.blog.loading,
    blog
  };
}
export default {
  components: {
    VueMarkdown
  },
  created: function() {
    const { params } = this.$route;
    if (!params.id) {
      this.$router.push("/");
    }
    this.handleGetBlog(params.id);
  },
  meta: {
    // sets document title
    title: "Blog Detail",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  methods: {
    ...mapActions("Blog", ["getBlog"]),
    handleGetBlog(id) {
      this.isLoading = true;
      const payload = {
        nextErr: err => {
          console.log(err);
        },
        nextSuccess: () => {
          // console.log(this.store.categories);
          this.isLoading = false;
        },
        id
      };
      this.getBlog(payload);
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  },
  data() {
    return {
      isLoading: true
    };
  }
};
</script>
