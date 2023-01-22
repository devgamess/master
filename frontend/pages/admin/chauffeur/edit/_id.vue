<template lang="">
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <LayoutsNavBar />
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <h1 class="h3 mb-0 text-gray-800">แก้ไขพนักงานขับรถ</h1>
          <div class="card mt-3">
            <div class="card-body">
              <form @submit="handleSubmit">
                <div class="row text-center mb-5">
                  <div class="col-md-12">
                    <img v-if="url" :src="url" :name="form.chauffeur_image.name" width="250" class="img-thumbnail" alt="..."></img>              
                  </div>
                </div>
                <div v-if="!url" class="row text-center mb-5">
                  <div class="col-md-12">
                    <img :src="api+'/'+form.chauffeur_image" width="250"></img>              
                  </div>
                </div>                
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">แก้ไขรูปภาพประจำตัว</span>
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
                            <label for="exampleInputEmail1" class="text-dark">ชื่อ</label>
                            <input v-model="form.chauffeur_fname" required="" oninput="setCustomValidity('')" oninvalid="this.setCustomValidity('กรุณากรอกชื่อ')" name="fname" type="text" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>                  
                    </div>       
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-dark">นามสกุล</label>
                            <input v-model="form.chauffeur_lname" required="" oninput="setCustomValidity('')" oninvalid="this.setCustomValidity('กรุณากรอกนามสกุล')" name="lname" type="text" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>                  
                    </div>                                         
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-dark">หน่วยงาน</label>
                            <select class="form-control" v-model="form.agency_id">
                                <option v-for="agency in agencys" :value="agency.agency_id">{{agency.agency_name}}</option>
                            </select>
                        </div>
                    </div>                                            
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-dark">เบอร์ติดต่อ</label>
                            <input v-model="form.chauffeur_phone" required="" oninput="setCustomValidity('')" oninvalid="this.setCustomValidity('กรุณากรอกเบอร์โทร')" name="phone" type="text" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>                  
                    </div>    
                    
                </div>
                <hr></hr>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary" type="submit">แก้ไข</button>
                  <NuxtLink to="/admin/chauffeur">
                    <button class="btn">ยกเลิก</button>
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
    name: 'ChauffeurAddPage',
    middleware: 'auth',
    layout: 'session',
    computed: {
    api () {
      return this.$store.state.auth.apiUrl
    }
    },
    mounted() {        
        this.fetchChauffeur()        
        this.fetchAgencyOne()
        this.fetchCars()
    },
    data() {
      return {    
        oldUrl:'',
        url:null,
        ranks:[],
        agencys:[],
        cars:[],
        form: {              
          chauffeur_fname: '',
          chauffeur_lname: '',
          chauffeur_image: null,
          chauffeur_phone: '',
          agency_id: '1',          
        },
      }
    },
    methods: {
      handleFile(e){
      const file = e.target.files[0];
      this.form.chauffeur_image = file;
      this.url = URL.createObjectURL(file);      
      console.log(this.url)
    },    
    async fetchAgencyOne(){
      const ip = await this.$axios.get(`api/agency`)
      this.agencys = ip.data.result
    },
    async fetchCars(){
      const ip = await this.$axios.get(`api/car`)
      this.cars = ip.data.result
    },
    async fetchChauffeur() {
      const ip = await this.$axios.get(`api/chauffeur/${this.$route.params.id}`)
      this.oldUrl = ip.data.result.chauffeur_image
      this.form = ip.data.result            
      console.log(this.form)
    },
    async handleSubmit(e) {      
      e.preventDefault()     
      const update = await this.$axios.put(`api/chauffeur/data`, this.form)      
      if (this.url != null) {
        const formData = new FormData();
        formData.append('image', this.form.chauffeur_image);
        formData.append('data', JSON.stringify({chauffeur_id: this.form.chauffeur_id,chauffeur_image:this.oldUrl}));      
        const headers = { 'Content-Type': 'multipart/form-data' };      
        const updateImage = await this.$axios.put(`api/chauffeur/image`,  formData, { headers })    
        if (updateImage.data.msg === 'success') {
        await this.$swal({
          type: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: '/admin/chauffeur' })
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
        this.$router.replace({ path: '/admin/chauffeur' })
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
  

    