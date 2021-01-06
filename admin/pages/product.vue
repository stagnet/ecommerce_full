<template>
  <main>
    <div class="container">
      <vs-row>
        <vs-col w="3" sm="3">col-3</vs-col>
        <vs-col w="6" sm="6">
          <h2 style="text-align: center" class="sub-heading">
            Add a New Product
          </h2>
          <form>
            <!-- category -->
            <div class="a-spacing-medium">
              <vs-select
                label-placeholder="Category"
                v-model="category"
                class="inputs"
                color="#e77600"
              >
                <vs-option label="Vuesax" value="Vuesax"> Vuesax </vs-option>
                <vs-option label="Vue" value="vue"> Vue </vs-option>
                <vs-option label="Javascript" value="js">
                  Javascript
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
                <vs-option label="Vuesax" value="Vuesax"> Vuesax </vs-option>
                <vs-option label="Vue" value="vue"> Vue </vs-option>
                <vs-option label="Javascript" value="js">
                  Javascript
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

            <!-- Description -->
            <div class="a-spacing-medium">
              <label class="bookDescription"> Description </label>
              <textarea
                class="inputs"
                placeholder="Provide details such as a product description"
                style="padding: 5px 10px"
              >
              </textarea>
            </div>

            <!-- add Photo  -->
            <div class="a-spacing-medium">
              <label class="bookDescription">Add Photo</label>
              <div class="a-row">
                <label class="choosefile-button">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <input type="file" />
                </label>
                <p style="margin-top: 10px; font-size: 15px">
                  Name of the photo
                </p>
              </div>
            </div>

            <!-- submit button -->
            <div class="a-spacing-large">
              <vs-button color="#f0c14b" relief gradient>
                <strong>Upload</strong>
                <i class="bx bx-upload bx-sm"></i>
              </vs-button>
            </div>
          </form>
        </vs-col>
        <vs-col w="3" sm="3">col-3</vs-col>
      </vs-row>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      category: '',
      owner: '',
      title: '',
      price: '',
      description: '',
    }
  },
  //? asyncData is fetching data before nuxt page finished loading on the browser..
  //? It is good for SEO because the data will be loaded first..
}
</script>

<style scoped>
.inputs {
  min-width: 100%;
  max-width: 100%;
}
</style>
