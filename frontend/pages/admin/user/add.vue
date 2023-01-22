<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">เพิ่มบัญชีผู้ใช้</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit="handleSubmit">
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
                  >Password</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    v-model="form.password"
                    name="password"
                    type="password"
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
                      สิทธ์ยืนยันการอนุมัติยืมรถ
                    </label>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary" type="submit">
                  เพิ่มบัญชีผู้ใช้
                </button>
                <NuxtLink to="/admin/user"
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
  name: "UserAddPage",
  middleware: "auth",
  layout: "session",
  data() {
    return {
      ranks: [],
      agencys: [],
      form: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        role: "user",
        submit_car: false,
        agency_id: 1,
        rank_id: 1,
      },
    }
  },
  mounted() {
    this.fetchRank()
    this.fetchAgency()
  },
  methods: {
    async fetchRank() {
      const ip = await this.$axios.get("api/rank")
      this.ranks = ip.data.result
    },
    async fetchAgency() {
      const ip = await this.$axios.get("api/agency")
      this.agencys = ip.data.result
    },
    async handleSubmit(e) {
      e.preventDefault()
      // return console.log(this.form)
      const ip = await this.$axios.$post("api/auth/register", this.form)
      console.log(ip)
      if (ip.msg === "success") {
        await this.$swal({
          type: "success",
          title: "บันทึกสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: "/admin/user" })
      } else if (ip.msg === "hasData") {
        this.$swal({
          type: "info",
          title: "email นี้ใช้งานแล้ว",
          showConfirmButton: false,
          timer: 1500,
        })
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
