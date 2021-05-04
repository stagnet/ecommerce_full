<template>
  <main>
    <div class="container">
      <!-- all Products -->
      <h1 class="heading">All Products</h1>

      <vs-row>
        <!-- button 1 -->
        <vs-col class="column" w="4" sm="12">
          <vs-button color="#f4d078" gradient to="/product">
            Add a New Product
            <template #animate>
              <i class="bx bxs-shopping-bags bx-sm bx-tada"></i>
            </template>
          </vs-button>
        </vs-col>

        <!-- button 2 -->
        <vs-col w="4" sm="12" class="column">
          <vs-button color="#f4d078" gradient>
            Add a New Category
            <template #animate>
              <i class="bx bxs-category-alt bx-sm bx-tada"></i>
            </template>
          </vs-button>
        </vs-col>

        <!-- button 3 -->
        <vs-col w="4" sm="12" class="column">
          <vs-button color="#f4d078" gradient>
            Add a New Owner
            <template #animate>
              <i class="bx bxs-face bx-sm bx-tada"></i>
            </template>
          </vs-button>
        </vs-col>
      </vs-row>

      <!-- product listing -->
      <product-card />
    </div>
  </main>
</template>

<script>
export default {}
</script>

<style scoped></style>
