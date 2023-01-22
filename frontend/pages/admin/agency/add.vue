<template lang="">
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">เพิ่มหน่วยงาน</h1>
        <div class="card mt-3">
          <div class="card-body">
            <form @submit="handleSubmit">
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label"
                  >ชื่อหน่วยงาน</label
                >
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    name="agency_name"
                    v-model="form.agency_name"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary" type="submit">
                  เพิ่มหน่วยงาน
                </button>
                <NuxtLink to="/admin/agency"
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
  name: 'AgencyAddPage',
  middleware: 'auth',
  layout: 'session',
  data() {
    return {
      form: {
        agency_name: '',
      },
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const ip = await this.$axios.$post('api/agency', this.form)
      if (ip.status === 200) {
        await this.$swal({
          type: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 1000,
        })
        this.$router.replace({ path: '/admin/agency' })
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
