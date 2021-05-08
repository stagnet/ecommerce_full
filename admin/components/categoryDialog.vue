<template>
  <div>
    <vs-dialog
      :loading="loading"
      :value="value"
      @click="onActive"
      v-on:close="close"
    >
      <template #header style="border-radius: 20px">
        <h4 class="not-margin">Add New <b>Product Category</b></h4>
      </template>

      <form @submit.prevent="onAddCategory" class="con-form">
        <vs-row>
          <!-- //? Input.. -->
          <vs-col w="12">
            <vs-input
              v-model="type"
              placeholder="Category"
              color="#e77600"
              class="input"
            >
              <template #icon> # </template>
            </vs-input>
          </vs-col>

          <!-- //? chip.. -->
          <vs-col
            w="2"
            sm="4"
            class="a-spacing-top-base"
            v-for="cat in categories.data"
            :key="cat._id"
          >
            <div class="md-chip md-chip-clickable md-chip-hover chip">
              {{ cat.type }}
            </div>
          </vs-col>
        </vs-row>

        <!-- //? button.. -->
        <div class="footer-dialog a-spacing-top-base">
          <vs-button block> Save</vs-button>
        </div>
      </form>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: 'categoryDialog',
  props: {
    value: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      type: '',
      chip: '',
      categories: [],
    }
  },
  // async fetch() {
  //   let response = await this.$axios.get('http://localhost:3000/api/categories')
  //   this.categories = response.data
  //   console.log(this.categories)
  // },
  async fetch() {
    this.categories = await fetch('http://localhost:3000/api/categories')
      .then((response) => {
        console.log('cat', this.categories)
        return response.json()
      })
      .catch((err) => console.log(err))
  },

  methods: {
    close() {
      this.$emit('input', !this.value)
    },

    onActive(event) {
      this.$emit('click', event.target.value)
      console.log(event.target.value)
    },

    async onAddCategory() {
      try {
        let type = { type: this.type }
        let result = await this.$axios.post(
          'http://localhost:3000/api/categories',
          type
        )
        this.categories.data.push(type)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>

<style scoped>
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  color: #12c2e9;
}
.con-form {
  width: 100%;
}
.input {
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  height: 30px;
  margin: 0 2px;
  border-radius: 32px;
  font-size: 13px;
}
.md-chip-hover:hover {
  background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  color: antiquewhite;
}
.md-chip-clickable {
  cursor: pointer;
}
</style>
