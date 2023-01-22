<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">แก้ไขบัญชีผู้ใช้</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit.prevent="onSubmit()">
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label"
                  >Email</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="email"
                    name="email"
                    v-model="form.email"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >ชื่อจริง</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="firstname"
                    v-model="form.firstname"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >นามสกุล</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="lastname"
                    v-model="form.lastname"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >ตำแหน่ง</label
                >
                <div class="col-sm-10">
                  <select class="form-control" v-model="form.rank_id">
                    <option v-for="rank in ranks" :value="rank.rank_id">
                      {{ rank.rank_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >หน่วยงาน</label
                >
                <div class="col-sm-10">
                  <select class="form-control" v-model="form.agency_id">
                    <option v-for="agency in agencys" :value="agency.agency_id">
                      {{ agency.agency_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >สิทธิการใช้งาน</label
                >
                <div class="col-sm-10">
                  <select
                    class="form-control"
                    v-model="form.role"
                    id="exampleFormControlSelect1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-10 text-center">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="form.submit_car"
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      สิทธ์ยืนยันการอนุมัติรถ
                    </label>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success mr-1" type="submit">
                  อัพเดท
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
                <nuxt-link to="/admin/user" class="btn">ยกเลิก</nuxt-link>
              </div>
            </form>
            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <form @submit.prevent="onChangePassword()">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        เปลี่ยนรหัสผ่าน
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-6 col-form-label"
                          >กรอกรหัสผ่านใหม่</label
                        >
                        <div class="col-sm-10">
                          <input
                            required
                            type="text"
                            name="lastname"
                            v-model="newPassword"
                            class="form-control"
                            id="inputPassword"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        ปิด
                      </button>
                      <button type="submit" class="btn btn-primary">
                        อัพเดท
                      </button>
                    </div>
                  </div>
                </form>
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
  name: "UserEditPage",
  middleware: "auth",
  layout: "session",
  data() {
    return {
      ranks: [],
      newPassword: "",
      agencys: [],
      form: {
        email: "",
        firstname: "",
        lastname: "",
        submit_car: false,
        role: "user",
      },
    }
  },
  mounted() {
    this.fetchUser()
    this.fetchAgency()
    this.fetchRank()
  },
  methods: {
    async fetchUser() {
      const ip = await this.$axios.get(`api/auth/user/${this.$route.params.id}`)
      this.form = ip.data.msg
      this.form.submit_car == "0"
        ? (this.form.submit_car = false)
        : (this.form.submit_car = true)
    },
    async fetchRank() {
      const ip = await this.$axios.get("api/rank")
      this.ranks = ip.data.result
    },
    async fetchAgency() {
      const ip = await this.$axios.get("api/agency")
      this.agencys = ip.data.result
    },
    async onChangePassword() {
      console.log("click")
      const ip = await this.$axios.post("api/auth/changePassword", {
        newPassword: this.newPassword,
        user_id: this.$route.params.id,
      })
      if (ip.data.status == 200) {
        await this.$swal({
          type: "success",
          title: "อัพเดทสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        })
        $('#exampleModal').modal('hide')

      } else {
        this.$swal({
          type: "error",
          title: "อัพเดทไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
    async onSubmit() {
      // return console.log(this.form)
      const ip = await this.$axios.put(
        `api/auth/user/${this.$route.params.id}`,
        this.form
      )
      console.log(ip)
      if (ip.data.status == 200) {
        await this.$swal({
          type: "success",
          title: "บันทึกสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: "/admin/user" })
      } else {
        this.$swal({
          type: "error",
          title: "บันทึกไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },    
  },
}
</script>
<style lang=""></style>
