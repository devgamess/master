<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">แก้ไขยานพาหนะ</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit="handleSubmit">
              <div class="row text-center mb-5">
                <div class="col-md-12">
                  <img v-if="url" :src="url" :name="form.car_image.name" width="250" class="img-thumbnail" alt="..."></img>              
                </div>
              </div>
              <div v-if="!url" class="row text-center mb-5">
                <div class="col-md-12">
                  <img :src="api+'/'+form.car_image" width="250"></img>              
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">เปลี่ยนรูปภาพ</span>
                    </div>
                    <div class="custom-file">
                      <input type="file" @change="handleFile" class="custom-file-input" ref="file">
                      <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >ยี่ห้อ</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="agency_name"
                    v-model="form.car_brand"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >รุ่น</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="agency_name"
                    v-model="form.car_model"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >ทะเบียนรถ</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="agency_name"
                    v-model="form.car_license"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >จำนวนที่นั่ง</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="number"
                    name="agency_name"
                    v-model="form.car_max_peple"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >รายละเอียด</label
                >
                <div class="col-sm-10">
                  <textarea
                    class="form-control"
                    v-model="form.car_detail"
                    rows="3"
                  ></textarea>
                </div>
              </div>             
              <div class="d-flex justify-content-center">
                <button class="btn btn-success mr-1" type="submit">
                  อัพเดท
                </button>
                <nuxt-link to="/admin/cars" class="btn">ยกเลิก</nuxt-link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->
    <LayoutsFooter />
  </div>
  <!-- End of Content Wrapper -->
</template>
<script>


export default {
  name: 'CarEditPage',
  middleware: 'auth',
  layout: 'session',
  computed: {
    api () {
      return this.$store.state.auth.apiUrl
    }
  },
  data() {
    return {
      oldUrl:'',
      url:null,
      form: {
        car_brand: '',
        car_detail: '',
        car_id: 1,
        car_image: '',
        car_license: '',
        car_max_peple: 0,
        car_model: '',
      },
    }
  },
  mounted() {
    this.fetchCar()
  },
  methods: {
    handleFile(e){
      const file = e.target.files[0];
      this.form.car_image = file;
      this.url = URL.createObjectURL(file);      
    },
    async fetchCar() {
      const ip = await this.$axios.get(`api/car/${this.$route.params.id}`)
      this.oldUrl = ip.data.result.car_image
      this.form = ip.data.result      
      console.log(this.form)
    },
    async handleSubmit(e) {      
      e.preventDefault()
     
        const update = await this.$axios.put(`api/car/data`, this.form)      
      if (this.url != null) {
        const formData = new FormData();
        formData.append('image', this.form.car_image);
        formData.append('data', JSON.stringify({car_id: this.form.car_id,car_image:this.oldUrl}));      
        const headers = { 'Content-Type': 'multipart/form-data' };      
        const updateImage = await this.$axios.put(`api/car/image`,  formData, { headers })    
        if (updateImage.data.msg === 'success') {
        await this.$swal({
          type: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: '/admin/cars' })
        } else {
          this.$swal({
            type: 'error',
            title: 'เพิ่มไม่สำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          })
        }            
        console.log(updateImage)
      } else{
        if (update.data.msg === 'success') {
        await this.$swal({
          type: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: '/admin/cars' })
        } else {
          this.$swal({
            type: 'error',
            title: 'เพิ่มไม่สำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
      
    },
  },
}
</script>
<style lang=""></style>
