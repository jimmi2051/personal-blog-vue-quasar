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
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-card class="q-pa-md q-ml-md q-mr-sm">
              <div class="thumbnail-video">
                <img
                  :src="
                    require('@/assets/images/Homepage/background-athena.png')
                  "
                  alt="company-3"
                  class="thumbnail-video-image"
                />
              </div>
              <q-card-section>
                <div class="text-h6">
                  Synopsis Solutions - ATHENA
                </div>
                <div class="text-subtitle2">
                  Transaction Monitoring AML / CTF Compliance
                </div>
                <q-btn type="a" href="/blog/" no-shadow>Read more </q-btn>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-card class="q-pa-md q-ml-md q-mr-sm">
              <div class="thumbnail-video">
                <img
                  :src="require('@/assets/images/Homepage/background-ares.png')"
                  alt="company-2"
                  class="thumbnail-video-image"
                />
              </div>
              <q-card-section>
                <div class="text-h6">
                  Synopsis Solutions - ARES
                </div>
                <div class="text-subtitle2">
                  Identity Verification with Ease and Efficiency
                </div>
                <q-btn
                  type="a"
                  href="https://www.cynopsis-solutions.com/athena"
                  no-shadow
                  target="__blank"
                  >Read more
                </q-btn>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-card class="q-pa-md q-mr-md q-ml-sm">
              <div class="thumbnail-video">
                <img
                  :src="
                    require('@/assets/images/Homepage/background-h3zoom.jpg')
                  "
                  alt="company-1"
                  class="thumbnail-video-image"
                />
              </div>
              <q-card-section>
                <div class="text-h6">H3Zoom - Facade Inspector</div>
                <div class="text-subtitle2">
                  Automating and Digitizing Building Facade Inspections
                </div>
                <q-btn
                  type="a"
                  href="https://www.cynopsis-solutions.com/athena"
                  no-shadow
                  target="__blank"
                  >Read more
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
  return {
    loading: state.Blog.categories.loading,
    categories
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
  },
  data() {
    return {
      filter: "",
      expanded: [],
      selected: ""
    };
  },
  methods: {
    ...mapActions("Blog", ["getCategories"]),
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
        },
        params
      };
      this.getCategories(payload);
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
