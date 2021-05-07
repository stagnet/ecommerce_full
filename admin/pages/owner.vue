<template>
  <div class="container">
    <vs-row justify="space-around">
      <vs-col w="3" sm="12">
        <h2 style="text-align: start" class="sub-heading">Add a New Owner</h2>
        <form @submit.prevent="onAddOwner" class="con-form">
          <!-- //? Input.. -->
          <vs-col class="a-spacing-medium a-spacing-top-base">
            <vs-input
              v-model="name"
              placeholder="Name"
              color="#e77600"
              class="input"
            >
              <template #icon>
                <i class="bx bx-user"></i>
              </template>
            </vs-input>
          </vs-col>

          <!-- Description -->
          <div class="a-spacing-medium">
            <label class="bookDescription"> About </label>
            <textarea
              class="inputs"
              placeholder="Provide details such as a product description"
              style="padding: 5px 10px; border-radius: 12px"
              v-model="about"
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

          <!-- //? button.. -->
          <div class="footer-dialog a-spacing-top-base">
            <vs-button block> Add Owner</vs-button>
          </div>
        </form>
      </vs-col>

      <vs-col w="8" sm="12">
        <vs-row justify="flex-end">
          <vs-col
            w="5"
            sm="12"
            v-for="owner in owners"
            :key="owner._id"
            class="a-spacing-top-base"
            offset="1"
          >
            <vs-card type="3">
              <template #title>
                <h3>{{ owner.name }}</h3>
              </template>
              <template #img>
                <img
                  :src="owner.photo"
                  alt="owner-image"
                  style="width: 270px; height: 140px"
                />
              </template>
              <template #text>
                <p>{{ owner.about }}</p>
              </template>
              <template #interactions>
                <vs-button danger icon>
                  <i class="bx bx-like"></i>
                </vs-button>
              </template>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  name: 'owner',
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('http://localhost:3000/api/owners')
      //   console.log('res', response.data)
      return {
        owners: response.data,
      }
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      selectedFile: null,
      about: '',
      name: '',
      fileName: '',
      owner: [],
    }
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
      this.fileName = event.target.files[0].name
    },

    //? post data to db..
    async onAddOwner() {
      try {
        let data = new FormData()
        data.append('name', this.name)
        data.append('about', this.about)
        data.append('ownerPhoto', this.selectedFile, this.selectedFile.name)
        let result = await this.$axios.post(
          'http://localhost:3000/api/owners',
          data
        )
        this.owners.push({
          name: this.name,
          about: this.about,
        })
        console.log(this.owners)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>
<style scoped>
@media (width: 375px) {
  .column {
    margin-left: 2px;
  }
}
</style>
