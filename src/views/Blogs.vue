<template>
  <q-page>
    <div class="blogs row">
      <div class="col-lg-3 blogs-menu">
        <q-input ref="filter" filled v-model="filter" label="Search by title">
          <template v-slot:append>
            <q-icon
              v-if="filter !== ''"
              name="clear"
              class="cursor-pointer"
              @click="resetFilter"
            />
          </template>
        </q-input>

        <q-tree
          :nodes="store.categories"
          node-key="label"
          :filter="filter"
          :filter-method="myFilterMethod"
          :expanded.sync="expanded"
          default-expand-all
          selected-color="primary"
          :selected.sync="selected"
        />
      </div>
      <div class="col-lg-9">
        <div class="row blogs-content">
          <div
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4"
            v-for="(blog, index) in store.blogs"
            :key="index"
          >
            <q-card class="q-pa-md q-ml-md q-mr-sm">
              <div class="thumbnail-video">
                <img
                  :src="require(`@/assets/images${blog.thumbnail}`)"
                  alt="company-3"
                  class="thumbnail-video-image"
                />
              </div>
              <q-card-section>
                <div class="text-h6">
                  {{ blog.title }}
                </div>
                <div class="text-subtitle2">
                  {{ blog.description }}
                </div>

                <q-btn
                  class="btn-readmore"
                  :to="`/blog/${blog.id}`"
                  exact
                  no-shadow
                >
                  Read more
                </q-btn>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

function mapStateToProps(state) {
  const data = state.Blog.categories.data;
  let categories = [];
  data.forEach(category => {
    let item = {};
    item.id = category._id;
    item.label = category.title;
    item.children = [];
    item.handler = e => {
      console.log("On click Category ==>", e);
    };
    category.blogs.forEach(blog => {
      item.children.push({
        id: blog._id,
        label: blog.title,
        handler(e) {
          console.log(e);
          // Toast.create("Tapped on item 1.3");
        }
      });
    });
    categories.push(item);
  });
  const blogs = state.Blog.blogs.data;
  return {
    loading: state.Blog.categories.loading,
    categories,
    blogs
  };
}
export default {
  meta: {
    // sets document title
    title: "Blogs Page",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  created: function() {
    this.handleGetCategoris({});
    this.handleGetBlogs({});
  },
  data() {
    return {
      filter: "",
      expanded: [],
      selected: ""
    };
  },
  methods: {
    ...mapActions("Blog", ["getCategories", "getBlogs"]),
    myFilterMethod(node, filter) {
      const filt = filter.toLowerCase();
      return node.label && node.label.toLowerCase().indexOf(filt) > -1;
    },

    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    handleGetCategoris(params) {
      let payload = {
        nextErr: err => {
          console.log(err);
        },
        nextSuccess: () => {
          // console.log(this.store.categories);
          // console.log(res);
        },
        params
      };
      this.getCategories(payload);
    },
    handleGetBlogs(params) {
      let payload = {
        nextErr: err => {
          console.log(err);
        },
        nextSuccess: () => {
          // console.log(this.store.categories);
          // console.log(res);
        },
        params
      };
      this.getBlogs(payload);
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
