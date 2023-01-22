<template lang="">
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <LayoutsNavBar />
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <h1 class="h3 mb-0 text-gray-800">เพิ่มพนักงานขับรถ</h1>
          <div class="card mt-3">
            <div class="card-body">
              <form @submit="handleSubmit">
                <div class="row text-center mb-5">
                  <div class="col-md-12">
                    <img v-if="url" :src="url" :name="form.chauffeur_image.name" width="250" class="img-thumbnail" alt="..."></img>              
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">อัพโหลดรูปภาพประจำตัว</span>
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
                            <input v-model="form.chauffeur_fname" name="fname" type="text" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>                  
                    </div>       
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-dark">นามสกุล</label>
                            <input v-model="form.chauffeur_lname" name="lname" type="text" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
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
                            <input v-model="form.chauffeur_phone" name="phone" type="text" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>                  
                    </div>       
                </div>
                <hr></hr>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary" type="submit">เพิ่ม</button>
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
    mounted() {
        this.fetchAgency()        
    },
    data() {
      return {    
        url:null,  
        ranks:[],
        agencys:[],
        form: {              
          chauffeur_fname: '',
          chauffeur_lname: '',
          chauffeur_image: null,
          chauffeur_phone: '',          
          rank_id: '1',
        },
      }
    },
    methods: {
      handleFile(e){
        const file = e.target.files[0];
        this.form.chauffeur_image = file;
        this.url = URL.createObjectURL(file);
        console.log(this.form.chauffeur_image.name)
      },      
      async fetchAgency(){
        const ip = await this.$axios.get('api/agency')
        this.agencys = ip.data.result
      },
       async handleSubmit(e) {
        e.preventDefault()
        // return console.log(this.form)
        const formData = new FormData();
        formData.append('image', this.form.chauffeur_image);
        formData.append('data', JSON.stringify(this.form));      
        const headers = { 'Content-Type': 'multipart/form-data' };
        const ip = await this.$axios.$post('api/chauffeur', formData, { headers })
        console.log(ip)
        if (ip.status === 200) {
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
      },
    },
  }
  </script>
  <style lang=""></style>
  

    