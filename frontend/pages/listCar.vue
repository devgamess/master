<template lang="">
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <LayoutsNavBar />
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div class="d-flex bd-highlight mb-3">
            <div class="mr-auto p-2 bd-highlight">
              <h1 class="h3 mb-0 text-gray-800">รถทั้งหมด</h1>
            </div>            
          </div>
  
          <div class="row mt-2">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">รูปรถ</th>
                        <th scope="col">ยี่ห้อ</th>
                        <th scope="col">รุ่น</th>
                        <th scope="col">จำนวนที่นั่ง</th>                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(car, index) in cars" :key="car.car_id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="$store.state.auth.apiUrl+'/'+car.car_image" width="250" class="img-thumbnail" alt="..."></img></td>
                        <td>{{ car.car_brand }}</td>
                        <td>{{ car.car_model }}</td>
                        <td>{{ car.car_max_peple }}</td>                                              
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
    layout: 'session',
    name: 'CarRead',
    middleware: 'auth',
    data() {
      return {
        cars: [],
      }
    },
    mounted() {
      this.fetchCar()
    },
    methods: {
      async fetchCar() {
        const ip = await this.$axios.get('api/car')
        this.cars = ip.data.result
      },
      handleDelete(id) {
        this.$swal({
          title: 'คุณต้องการลบจริงๆ หรือไม่?',
          type: 'info',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: `ยกลเลิก`,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.value) {
            try {
              const resDel = await this.$axios.delete(`api/car/${id}`)
              if (resDel.data.msg === 'success') {
                await this.$swal({
                  type: 'success',
                  title: 'ลบสำเร็จ',
                  showConfirmButton: false,
                  timer: 1000,
                })
                this.fetchRank()
              } else {
                await this.$swal({
                  type: 'error',
                  title: 'ลบไม่สำเร็จ',
                  showConfirmButton: false,
                  timer: 1500,
                })
              }
            } catch (error) {
              await this.$swal({
                type: 'error',
                title: 'ล้มเหลว',
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }
        })
      },
    },
  }
  </script>
  <style lang=""></style>
  