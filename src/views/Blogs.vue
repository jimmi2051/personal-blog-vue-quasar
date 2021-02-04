<template>
  <q-page>
    <div class="blogs row">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 blogs-menu">
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
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
        <div class="row blogs-content" v-if="!loading">
          <div
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4"
            v-for="(blog, index) in store.blogs"
            :key="index"
          >
            <q-card class="q-pa-md q-ml-md q-mr-sm q-mb-lg">
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
        <div class="row blogs-pagination" v-if="!loading">
          <div class="col-xl-12">
            <q-pagination
              v-model="page"
              :max="pageSize"
              :direction-links="true"
              :boundary-links="true"
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
            >
            </q-pagination>
          </div>
        </div>
        <div class="row blogs-skeleton" v-if="loading">
          <q-inner-loading :showing="true">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
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
      this.category = e.id;
    };
    category.blogs.forEach(blog => {
      item.children.push({
        id: blog._id,
        label: blog.title,
        handler: () => {
          this.$router.push(`/blog/${blog.id}`);
        }
      });
    });
    categories.push(item);
  });
  categories.push({
    id: "all",
    label: "View All",
    handler: () => {
      this.category = "";
    },
    children: []
  });
  const blogs = state.Blog.blogs.data;
  const count = state.Blog.blogs.count;
  this.pageSize = Math.ceil(count / this.itemPerPage);
  return {
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
    this.handleGetBlogs({
      _limit: this.itemPerPage,
      _start: (this.page - 1) * this.itemPerPage
    });
  },
  data() {
    return {
      filter: "",
      expanded: [],
      selected: "",
      page: 1,
      itemPerPage: 6,
      pageSize: 1,
      category: "",
      loading: true
    };
  },
  watch: {
    page() {
      this.handleGetBlogs({
        _limit: this.itemPerPage,
        _start: (this.page - 1) * this.itemPerPage
      });
    },
    category(newValue) {
      this.page = 1;
      if (newValue !== "") {
        this.handleGetBlogs({
          _limit: this.itemPerPage,
          _start: (this.page - 1) * this.itemPerPage,
          category: newValue
        });
      } else {
        this.handleGetBlogs({
          _limit: this.itemPerPage,
          _start: (this.page - 1) * this.itemPerPage
        });
      }
    }
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
          console.log("[ERROR] " + err);
        },
        nextSuccess: () => {},
        params
      };
      this.getCategories(payload);
    },
    handleGetBlogs(params) {
      this.loading = true;
      let payload = {
        nextErr: err => {
          console.log("[ERROR] " + err);
        },
        nextSuccess: () => {
          this.loading = false;
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
  // updated() {
  //   console.log("this is ===>", this.store);
  // }
};
</script>
