<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">รายการจองรถ</h1>
        <div class="row mt-2">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ลำดับ</th>
                      <th scope="col">รถที่จอง</th>
                      <th scope="col">ผู้จอง</th>
                      <th scope="col">วันที่เดินทาง</th>
                      <th scope="col">วันที่กลับ</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(reserve, i) in reserves">
                      <td>{{ i + 1 }}</td>
                      <td>
                        {{
                          `${reserve.car_brand} ${reserve.car_model} ${reserve.car_license}`
                        }}
                      </td>
                      <td>
                        {{ reserve.firstname }}
                        {{ reserve.lastname }}
                      </td>
                      <td>{{ reserve.reserve_start_date_time | moment }}</td>
                      <td>{{ reserve.reserve_end_date_time | moment }}</td>
                      <td>
                        <nuxt-link
                          :to="`/reserves/detail/${reserve.reserve_service_id}`"
                        >
                          <button class="btn btn-primary">รายละเอียด</button>
                        </nuxt-link>
                        <button
                          class="btn btn-success"
                          v-if="
                            reserve.reserve_isSubmit === '0' &&
                            $store.state.auth.currentUser.submit_car === '1'
                          "
                          @click="onSubmitCar(reserve.reserve_service_id)"
                        >
                          อนุมัติการจอง
                        </button>
                        <button
                          class="btn btn-success"
                          v-if="reserve.reserve_isSubmit === '1'"
                          disabled
                        >
                          อนุมัติแล้ว
                        </button>
                        <button
                          class="btn btn-secondary"
                          v-if="
                            reserve.reserve_isSubmit === '0' &&
                            $store.state.auth.currentUser.submit_car === '0'
                          "
                          disabled
                        >
                          รออนุมัติ
                        </button>
                        <button
                          v-if="
                            $store.state.auth.currentUser.submit_car === '1'
                          "
                          class="btn btn-danger"
                          @click="onDelete(reserve.reserve_service_id)"
                        >
                          ยกเลิก
                        </button>
                      </td>
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
const moment = require("moment")
require("moment/locale/th")

export default {
  layout: "session",
  name: "reserve",
  middleware: "auth",

  data() {
    return {
      reserves: [],
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format("Do MMMM YYYY h:mm:ss ")
    },
  },
  mounted() {
    this.fetchReserve()
  },
  methods: {
    async onSubmitCar(reserve_id) {
      try {
        const ip = await this.$axios.post(`api/reserve/onsubmit-reserve`, {
          reserveId: reserve_id,
          userId: this.$store.state.auth.currentUser.user_id,
        })

        await this.$swal({
          type: "success",
          title: "สำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        })
        this.fetchReserve()
      } catch (error) {
        console.log(error.message)
      }
    },
    async onDelete(reserve_id) {
      const ip = await this.$axios.delete(`api/reserve/${reserve_id}`)
      if (ip.data.status == 200) {
        await this.$swal({
          type: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        })
        this.fetchReserve()
      } else {
        this.$swal({
          type: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
    async fetchReserve() {
      const ip = await this.$axios.get("api/reserve")
      this.reserves = ip.data.result
    },
    handleDelete(id) {
      this.$swal({
        title: "คุณต้องการลบจริงๆ หรือไม่?",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: `ยกลเลิก`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.value) {
          try {
            const resDel = await this.$axios.delete(`api/agency/${id}`)
            if (resDel.data.status === 200) {
              await this.$swal({
                type: "success",
                title: "ลบสำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              })
              this.fetchReserve()
            } else {
              await this.$swal({
                type: "error",
                title: "ลบไม่สำเร็จ",
                showConfirmButton: false,
                timer: 1500,
              })
            }
          } catch (error) {
            await this.$swal({
              type: "error",
              title: "ล้มเหลว",
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
