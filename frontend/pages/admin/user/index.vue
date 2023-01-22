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
            <h1 class="h3 mb-0 text-gray-800">จัดการบัญชีผู้ใช้</h1>
          </div>
          <div class="p-2 bd-highlight">
            <nuxt-link to="/admin/user/add">
              <button class="btn btn-primary">เพิ่มบัญชีผู้ใช้</button>
            </nuxt-link>
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
                      <th scope="col">Email</th>
                      <th scope="col">ชื่อ</th>
                      <th scope="col">นามสกุล</th>
                      <th scope="col">สิทธิการอนุมัติ</th>
                      <th scope="col">สิทธิการใช้งาน</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users" :key="user.user_id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.firstname }}</td>
                      <td>{{ user.lastname }}</td>
                      <td>
                        <span
                          v-if="user.submit_car === '0'"
                          class="badge bg-warning text-white p-2"
                        >
                          ไม่มีสิทธิ
                        </span>
                        <span
                          v-else="user.submit_car === '0'"
                          class="badge bg-success text-white p-2"
                        >
                          มีสิทธิ
                        </span>
                      </td>
                      <td>{{ user.role }}</td>
                      <td>
                        <nuxt-link
                          class="btn btn-warning"
                          :to="`/admin/user/edit/${user.user_id}`"
                          >แก้ไข</nuxt-link
                        >
                        <button
                          class="btn btn-danger"
                          @click="handleDelete(user.user_id)"
                        >
                          ลบ
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
export default {
  layout: "session",
  name: "UsersPage",
  middleware: "auth",
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      const ip = await this.$axios.get("api/auth/users")
      this.users = ip.data.user
    },
    handleDelete(id) {
      this.$swal({
        title: "คุณต้องการลบจริงๆ หรือไม่?",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: `ยกเลิก`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.value) {
          try {
            const resDel = await this.$axios.delete(`api/auth/users/${id}`)
            if (resDel.data.status === 200) {
              await this.$swal({
                type: "success",
                title: "ลบสำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              })
              this.fetchUser()
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
