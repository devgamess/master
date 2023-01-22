<template lang="">
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <LayoutsNavBar />
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <h1 class="h3 mb-0 text-gray-800">รายละเอียดการจองรถ</h1>
          <div class="card mt-3">
            <div class="card-body">
              <form>
                <fieldset disabled>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">รถ</label>
                        <input name="reserve_objective" :value="`${reserve.car_brand} ${reserve.car_model} ${reserve.car_license}`" type="text" class="form-control"></input>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">วัตถุประสงค์</label>
                        <input name="reserve_objective" :value="reserve.reserve_objective" type="text" class="form-control"></input>
                      </div>                  
                    </div>                
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">สถานที่เดินทาง :</label>
                        <input type="text" name="reserve_length" :value="fullNameAddress" class="form-control"  aria-label="Username" aria-describedby="basic-addon1"></input>
                      </div>  
                    </div>                    
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">ระยะทาง</label>
                        <input type="text" name="reserve_length" :value="`${reserve.reserve_length} กม.`" class="form-control"  aria-label="Username" aria-describedby="basic-addon1"></input>
                      </div>                  
                    </div>                     
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">งบค่าเชื้อเพลิง</label>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="งบประมาณแผ่นดิน" checked>
                          <label class="form-check-label" for="exampleRadios1">
                            {{reserve.reserve_budget_type}}
                          </label>
                        </div>                        
                      </div>                  
                    </div>   
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">บุคลากรที่เดินทางจำนวน</label>
                        <input type="text" class="form-control" :value="reserve.reserve_personnel_amount" name="reserve_personnel_amount"  aria-label="Username" aria-describedby="basic-addon1"></input>
                      </div>                  
                    </div> 
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">นักศึกษาที่เดินทางจำนวน</label>
                        <input type="text" class="form-control" :value="reserve.reserve_student_amount" name="reserve_student_amount"  aria-label="Username" aria-describedby="basic-addon1"></input>
                      </div>                  
                    </div> 
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">วันเวลาที่เดินทางไป : {{reserve.reserve_start_date_time | moment}}</label>                                            
                      </div>                  
                    </div> 
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">วันเวลาที่เดินทางกลับ : {{reserve.reserve_end_date_time | moment}}</label>                                            
                      </div>                  
                    </div>               
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">ผู้รับผิดชอบในการควบคุมการใช้รถยนต์</label>
                        <div v-for="(chauffeur_care,index) in chauffeur_cares">
                          <p :key="chauffeur_care.id">{{index+1+". "+chauffeur_care.chauffeur_fname+" "+chauffeur_care.chauffeur_lname}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">ผู้จองรถ</label>                        
                          <p>{{ reserve.firstname+" "+reserve.lastname }}</p>                        
                      </div>
                    </div>
                    <div class="col-md-6" v-if="reserve.reserve_isSubmit ==='1'">
                      <div class="form-group">
                        <label for="exampleInputEmail1" class="text-dark">ผู้อนุมัติ</label>                        
                          <p>{{ reserve.submit_firstname+" "+reserve.submit_lastname }}</p>                        
                      </div>
                    </div>
                  </div> 
                </fieldset>      
                <div class="text-center" type="submit">
                  <nuxt-link to="/reserve">
                    <button class="btn btn-primary">กลับ</button>
                  </nuxt-link>   
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
  import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  const moment = require("moment")
  require("moment/locale/th")
  export default {
    name: "detailReserve",
    middleware: "auth",
    layout: "session",
    components: {
      ThailandAutoComplete,
      DatePicker
    },  
    filters: {
      moment: function (date) {
        return moment(date).format("Do MMMM YYYY h:mm:ss ")
      },
    },
    data() {
      return {
        cars:[],
        chauffeurs:[],
        chauffeur_cares:[],
        reserve:{},
        district: '',
        amphoe: '',
        province: '',
        zipcode: '',
        fullNameAddress:''
      }
    },
    mounted() {
      this.fetchReserve()      
    },
    methods: {
      async fetchCare(carId) {
        const ip = await this.$axios.get(`api/care/${carId}`)        
        this.chauffeur_cares = ip.data.result
      },
      async fetchFullAddress(tmp_full){
        const ip = await this.$axios.get(`api/address/getFullName/${tmp_full}`)        
        console.log(ip.data.result)
        this.fullNameAddress = `ต.${ip.data.result[0].tambonname} อ.${ip.data.result[0].ampurname} จ.${ip.data.result[0].changwatname}`
      },
      async fetchReserve() {
        const ip = await this.$axios.get(`api/reserve/${this.$route.params.id}`)
        this.fetchFullAddress(ip.data.result.reserve_address_code_full)
        console.log(ip.data.result)
        this.fetchCare(ip.data.result.car_id)
        this.reserve = ip.data.result
      },                  
    },
  }
  </script>
  <style lang=""></style>
  