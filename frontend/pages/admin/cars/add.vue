<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">เพิ่มรถ</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit="handleSubmit">
              <div class="row text-center mb-5">
                <div class="col-md-12">
                  <img v-if="url" :src="url" :name="form.car_image.name" width="250" class="img-thumbnail" alt="..."></img>              
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">อัพโหลดรูปภาพ</span>
                    </div>
                    <div class="custom-file">
                      <input type="file" @change="handleFile" class="custom-file-input" ref="file">
                      <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="staticEmail" class="col-sm-2 col-form-label"
                      >ยี่ห้อรถ</label
                    >
                    <div class="col-sm-10">
                      <input
                        required
                        type="text"
                        name="band"
                        v-model="form.car_brand"
                        class="form-control"
                       
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="staticEmail" class="col-sm-2 col-form-label"
                      >รุ่นรถ</label
                    >
                    <div class="col-sm-10">
                      <input
                        required
                        type="text"
                        name="model"
                        v-model="form.car_model"
                        class="form-control"
                      
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="staticEmail" class="col-sm-3 col-form-label"
                      >เลขทะเบียน</label
                    >
                    <div class="col-sm-10">
                      <input
                        required
                        type="text"
                        name="carlicen"
                        v-model="form.car_license"
                        class="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="staticEmail" class="col-sm-3 col-form-label"
                      >จำนวนที่นั่ง</label
                    >
                    <div class="col-sm-10">
                      <input
                        required
                        type="number"
                        name="max"
                        v-model="form.car_max_peple"
                        class="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="staticEmail" class="col-sm-3 col-form-label"
                      >รายละเอียด</label
                    >
                    <div class="col-sm-10">
                      <textarea class="form-control" v-model="form.car_detail" rows="3"></textarea>
                    </div>
                  </div>
                </div>

              </div>
              <hr></hr>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary" type="submit">เพิ่ม</button>
                <NuxtLink to="/admin/cars"
                  ><button class="btn">ยกเลิก</button>
                </NuxtLink>
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
  name: 'CarAddPage',
  middleware: 'auth',
  layout: 'session',
  data() {
    return {    
      url:null,  
      form: {
        car_image: null,
        car_model: '',
        car_brand: '',
        car_license: '',
        car_max_peple: '',
        car_detail: '',
      },
    }
  },
  methods: {
    handleFile(e){
      const file = e.target.files[0];
      this.form.car_image = file;
      this.url = URL.createObjectURL(file);
      console.log(this.form.car_image.name)
    },
     async handleSubmit(e) {
      e.preventDefault()
      this.form.car_color_badge = Math.floor(Math.random()*16777215).toString(16);
      const formData = new FormData();
      formData.append('image', this.form.car_image);
      formData.append('data', JSON.stringify(this.form));      
      const headers = { 'Content-Type': 'multipart/form-data' };
      const ip = await this.$axios.$post('api/car', formData, { headers })
      console.log(ip)
      if (ip.status === 200) {
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
    },
  },
}
</script>
<style lang=""></style>
