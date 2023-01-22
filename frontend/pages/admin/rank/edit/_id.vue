<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">แก้ไขตำแหน่ง</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit="handleSubmit">
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >ชื่อหน่วยงาน</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="rank_name"
                    v-model="form.rank_name"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success mr-1" type="submit">
                  อัพเดท
                </button>
                <nuxt-link to="/admin/rank" class="btn">ยกเลิก</nuxt-link>
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
  name: 'RankEditPage',
  middleware: 'auth',
  layout: 'session',
  data() {
    return {
      form: {
        rank_name: '',
      },
    }
  },
  mounted() {
    this.fetchRank()
  },
  methods: {
    async fetchRank() {
      const ip = await this.$axios.get(`api/rank/${this.$route.params.id}`)
      this.form = ip.data.result
    },
    async handleSubmit(e) {
      e.preventDefault()
      const update = await this.$axios.put(`api/rank`, {
        rank_id: this.$route.params.id,
        rank_name: this.form.rank_name,
      })
      if (update.data.msg === 'success') {
        await this.$swal({
          type: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: '/admin/rank' })
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
