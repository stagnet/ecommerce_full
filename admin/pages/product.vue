<template>
  <main>
    <div class="container">
      <vs-row>
        <vs-col w="3" sm="3"></vs-col>
        <vs-col w="6" sm="6">
          <section>
            <h2 style="text-align: center" class="sub-heading">
              Add a New Product
            </h2>
            <form>
              <div class="a-spacing-medium">
                <vs-input label-placeholder="Category" v-model="category" />
              </div>
            </form>
          </section>
        </vs-col>
        <vs-col w="3" sm="3"></vs-col>
      </vs-row>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      category: '',
    }
  },
}
</script>

<style scoped></style>
