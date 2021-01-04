<template>
  <div class="card">
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching mountains</p>
    <vs-row>
      <vs-col
        w="4"
        sm="12"
        v-for="(product, index) in products.data"
        :key="index"
        class="column"
      >
        <vs-card>
          <!-- title -->
          <template #title>
            <h3>{{ product.title }}</h3>
          </template>

          <!-- image -->
          <template #img>
            <img
              :src="product.photo[0]"
              alt="book-cover"
              style="width: 190px; height: 220px"
            />
          </template>

          <!-- Product details -->
          <template #text>
            <vs-col w="12">
              <strong
                style="color: #ff5252; margin-right: 5px; font-size: 16px"
              >
                ${{ product.price }}
              </strong>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </vs-col>
            <p>{{ product.description }}</p>
          </template>

          <!-- buttons -->
          <template #interactions>
            <vs-button color="#71c7ec" gradient class="update-button">
              Update
              <i class="bx bx-pencil bx-xs"></i>
            </vs-button>
            <vs-button color="#ff5252" gradient class="delete-button">
              <i class="bx bx-trash bx-xs"></i>
            </vs-button>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data() {
    return {
      products: [],
    }
  },
  //? Fetch hook is called after the component instance is created on the server-side.
  //? That makes this context available inside the fetch.
  async fetch() {
    this.products = await fetch('http://localhost:3000/api/products')
      .then((response) => {
        return response.json()
      })
      .catch((err) => console.log(err))
  },
  // fecthOnServer: false,
}
</script>

<style scoped>
.card {
  margin-top: 30px;
}
.column {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 10px 0px;
}
/* .update-button {
  float: left;
}
.delete-button {
  float: right;
} */
</style>
