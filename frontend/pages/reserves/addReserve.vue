<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">จองรถ</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit="handleSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">วันเวลาที่เดินทางไป</label>                    
                    <date-picker required v-model="form.reserve_start_date_time" @change="onDateChange" type="datetime"></date-picker>
                  </div>                  
                </div> 
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">วันเวลาที่เดินทางกลับ</label>                    
                    <date-picker required v-model="form.reserve_end_date_time" @change="onDateChange" type="datetime"></date-picker>
                  </div>                  
                </div>       
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">เลือกรถ</label>
                    <select class="form-control" required v-model="form.car_id">
                      <option v-for="car in cars" :value="car.car_id">{{car.car_brand}} รุ่น : {{car.car_model}} ทะเบียน : {{car.car_license}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">วัตถุประสงค์</label>
                    <input v-model="form.reserve_objective" required name="reserve_objective" type="text" class="form-control" placeholder="กรุณากรอก :"></input>
                  </div>                  
                </div>                
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">จังหวัด</label>
                    <select class="form-control" required @change="fetchAmpChange" v-model="form.chw">
                      <option v-for="chw in chws" :value="chw.changwatcode">{{chw.changwatname}}</option>
                    </select>
                  </div>                                
                </div>                  
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">อำเภอ</label>
                    <select class="form-control" required v-model="form.amp" @change="fetchTmbChange" :disabled="disAmp">
                      <option v-for="amp in amps" :value="amp.ampurcodefull">{{amp.ampurname}}</option>
                    </select>
                  </div>                                
                </div>                                                
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">ตำบล</label>
                    <select class="form-control" required v-model="form.tmb" :disabled="disTmb">
                      <option v-for="tmb in tmbs" :value="tmb.tamboncodefull">{{tmb.tambonname}}</option>
                    </select>
                  </div>                                
                </div>                                                                                                              
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">ระยะทาง</label>
                    <input type="text" required v-model="form.reserve_length" name="reserve_length" class="form-control" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                  </div>                  
                </div>                     
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">งบค่าเชื้อเพลิง</label>
                    <div class="form-check">
                      <input class="form-check-input" v-model="form.reserve_budget_type" type="radio" name="exampleRadios" id="exampleRadios1" value="งบประมาณแผ่นดิน" checked>
                      <label class="form-check-label" for="exampleRadios1">
                        งบประมาณแผ่นดิน
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" v-model="form.reserve_budget_type" type="radio" name="exampleRadios" id="exampleRadios1" value="งบรายได้" checked>
                      <label class="form-check-label" for="exampleRadios1">
                        งบรายได้
                      </label>
                    </div>                
                    <div class="form-check">
                      <input class="form-check-input" v-model="form.reserve_budget_type" type="radio" name="exampleRadios" id="exampleRadios1" value="งบอื่นๆ" checked>
                      <label class="form-check-label" for="exampleRadios1">
                        งบอื่นๆ
                      </label>
                    </div>
                  </div>                  
                </div>   
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">บุคลากรที่เดินทางจำนวน</label>
                    <input type="text" class="form-control" required v-model="form.reserve_personnel_amount" name="reserve_personnel_amount" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                  </div>                  
                </div> 
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-dark">นักศึกษาที่เดินทางจำนวน</label>
                    <input type="text" class="form-control" required v-model="form.reserve_student_amount" name="reserve_student_amount" placeholder="กรุณากรอก :" aria-label="Username" aria-describedby="basic-addon1"></input>
                  </div>                  
                </div> 
                                        
              </div>       
              <div class="text-center" type="submit">
                <button class="btn btn-primary">บันทึก</button>
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
import moment from 'moment';
import { on } from 'events';
export default {
  name: "IndexPage",
  middleware: "auth",
  layout: "session",
  components: {
    ThailandAutoComplete,
    DatePicker
  },  
  
  data() {
    return {
      cars:[],
      chauffeurs:[],
      form:{},
      reserves:[],
      chws:[],
      amps:[],
      tmbs:[],
      disAmp:true,
      disTmb:true
    }
  },
  mounted() {    
    this.fetchChauffeur()    
    this.fetchReserve()
    this.fetchChw()
  },
  methods: {
    select (address) {
      this.district = address.district
      this.amphoe = address.amphoe
      this.province = address.province
      this.zipcode = address.zipcode
    },    
    async fetchChauffeur(){
      const ip = await this.$axios.get("api/chauffeur")
      this.chauffeurs = ip.data.result
    },
    async fetchReserve() {
      const ip = await this.$axios.get("api/reserve")
      this.reserves = ip.data.result
    },
    
    async fetchChw(){
      const ip = await this.$axios.get("api/address/chw")
      this.chws = ip.data.result      
    },
    async fetchAmpChange(){
      const ip = await this.$axios.get(`api/address/amp/${this.form.chw}`)
      this.disAmp = false
      this.disTmb = true      
      this.form.tmb = ''
      this.amps = ip.data.result            
    },
    async fetchTmbChange(){
      const ip = await this.$axios.get(`api/address/tmb/${this.form.amp}`)
      this.disAmp = false
      this.disTmb = false      
      this.tmbs = ip.data.result      
    },
    async onDateChange(){
      if(this.form.reserve_start_date_time &&this.form.reserve_end_date_time){
        this.cars = []
        //หารถที่ว่าง
        const carUsed = this.reserves.filter((item)=>{          
          return (
            moment(this.form.reserve_start_date_time).format('YYYY MM DD, h:mm:ss a') < moment(item.reserve_start_date_time ).format('YYYY MM DD, h:mm:ss a')  &&
            moment(this.form.reserve_end_date_time).format('YYYY MM DD, h:mm:ss a') > moment(item.reserve_end_date_time ).format('YYYY MM DD, h:mm:ss a'))    
          // return (moment(this.form.reserve_start_date_time).format('YYYY MM DD, h:mm:ss a') < moment(item.reserve_start_date_time ).format('YYYY MM DD, h:mm:ss a')  &&
          //   moment(this.form.reserve_end_date_time).format('YYYY MM DD, h:mm:ss a') > moment(item.reserve_end_date_time ).format('YYYY MM DD, h:mm:ss a'))    
          
          
        })        
        const carIds = carUsed.map(item=>{
          return item.car_id
        })
        console.log(carIds)
        const ip = await this.$axios.post(`api/car/carNotIn`,{car_ids:carIds})        
        this.cars = ip.data.result
        // this.form.car_id = this.cars[0].car_id
        // this.fetchCar(carUsed)        
      }
    },
    async handleSubmit(e){
      e.preventDefault()
      // return console.log(this.form) 
      try {
        // this.form.user_id = this.currentUser.user_id
        this.form.user_id = this.$store.state.auth.currentUser.user_id
        this.form.reserve_address_code_full = this.form.tmb       
        const ip = await this.$axios.$post('api/reserve', this.form)
        if (ip.status === 200) {
          await this.$swal({
            type: 'success',
            title: 'บันทึกสำเร็จ',
            showConfirmButton: false,
            timer: 1000,
          })
          this.$router.replace({ path: '/reserve' })
        } else {
          this.$swal({
            type: 'error',
            title: 'เพิ่มไม่สำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } catch (error) {
        console.log(error.message)
        this.$swal({
          type: 'error',
          title: 'เพิ่มไม่สำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      
    }
  },
}
</script>
<style lang=""></style>
