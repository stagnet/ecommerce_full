<template>
  <main>
    <div class="container">
      <vs-row>
        <vs-col w="2"></vs-col>
        <vs-col w="5" sm="12">
          <h2 style="text-align: center" class="sub-heading">
            Add a New Product
          </h2>
          <form @submit.prevent="AddProductData">
            <!-- category -->
            <div class="a-spacing-medium">
              <vs-select
                label-placeholder="Category"
                v-model="category"
                class="inputs"
                color="#e77600"
              >
                <vs-option
                  v-for="category in categories"
                  :key="category._id"
                  :label="category.type"
                  :value="category._id"
                >
                  {{ category.type }}
                </vs-option>
              </vs-select>
            </div>

            <!-- owner -->
            <div class="a-spacing-medium">
              <vs-select
                label-placeholder="Owner"
                v-model="owner"
                class="inputs"
                color="#e77600"
              >
                <vs-option
                  v-for="owner in owners"
                  :key="owner._id"
                  :label="owner.name"
                  :value="owner._id"
                >
                  {{ owner.name }}
                </vs-option>
              </vs-select>
            </div>

            <!-- title -->
            <div class="a-spacing-medium">
              <vs-input
                type="text"
                label-placeholder="Title"
                v-model="title"
                color="#e77600"
                class="inputs"
              />
            </div>

            <!-- price -->
            <div class="a-spacing-medium">
              <vs-input
                type="text"
                label-placeholder="Price"
                v-model="price"
                color="#e77600"
                class="inputs"
              />
            </div>

            <!-- stock Quantity -->
            <div class="a-spacing-medium">
              <vs-input
                type="text"
                label-placeholder="Stocks Quantity"
                v-model="stockQuantity"
                color="#e77600"
                class="inputs"
              />
            </div>

            <!-- Description -->
            <div class="a-spacing-medium">
              <label class="bookDescription"> Description </label>
              <textarea
                class="inputs"
                placeholder="Provide details such as a product description"
                style="padding: 5px 10px; border-radius: 12px"
                v-model="description"
              >
              </textarea>
            </div>

            <!-- add Photo  -->
            <div class="a-spacing-medium">
              <label class="bookDescription">Add Photo</label>
              <div class="a-row">
                <label class="choosefile-button">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <input type="file" @change="onFileSelected" />
                </label>
                <p style="margin-top: 10px; font-size: 15px">
                  {{ fileName }}
                </p>
              </div>
            </div>

            <!-- submit button -->
            <div class="a-spacing-large">
              <vs-button color="#f0c14b" relief gradient circle upload>
                <strong>Upload</strong>
                <i class="bx bx-upload bx-sm"></i>
              </vs-button>
            </div>
          </form>
        </vs-col>
        <vs-col w="4" sm="10">
          <img src="../assets/Profile.png" alt="form-image" />
        </vs-col>
      </vs-row>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Add-product',
  //? asyncData is fetching data before nuxt page finished loading on the browser..
  //? It is good for SEO because the data will be loaded first..
  async asyncData({ $axios }) {
    try {
      //* with $ shortcut in axios we will get direct data and with it we'll get the response...
      let categories = $axios.$get('http://localhost:3000/api/categories')
      let owners = $axios.$get('http://localhost:3000/api/owners')

      const [catResponse, ownerResponse] = await Promise.all([
        categories,
        owners,
      ])
      // console.log('catResponse', catResponse)
      // console.log('ownerResponse', ownerResponse)
      return {
        categories: catResponse.data,
        owners: ownerResponse.data,
      }
    } catch (error) {
      console.error(error)
    }
  },
  // ? data() is processed on client-side(browser) while asynData() process in server-side..
  data() {
    return {
      category: '',
      owner: '',
      title: '',
      price: 0,
      stockQuantity: 1,
      selectedFile: null,
      description: '',
      fileName: '',
    }
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
      this.fileName = event.target.files[0].name
    },

    //? post data to db..
    async AddProductData() {
      let data = new FormData()
      data.append('title', this.title)
      data.append('price', this.price)
      data.append('description', this.description)
      data.append('ownerID', this.owner)
      data.append('stockQuantity', this.stockQuantity)
      data.append('categoryID', this.category)
      data.append('photo', this.selectedFile, this.selectedFile.name)

      let result = await this.$axios.$post(
        'http://localhost:3000/api/products',
        data
      )
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
main {
  position: absolute;
}
.inputs {
  min-width: 100%;
  max-width: 100%;
}
img {
  margin: 15px 5px;
  min-width: 550px;
  width: 100%;
  min-height: 350px;
  height: 100%;
}
form {
  margin: 20px 40px;
}
img {
  width: 100%;
  height: auto;
}
@media (max-width: 414px) {
  img {
    min-width: 350px;
    height: 400px;
  }
}
</style>
