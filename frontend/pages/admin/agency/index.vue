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
            <h1 class="h3 mb-0 text-gray-800">หน่วยงาน</h1>
          </div>
          <div class="p-2 bd-highlight">
            <nuxt-link to="/admin/agency/add">
              <button class="btn btn-primary">เพิ่มหน่วยงาน</button>
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
                      <th scope="col">หน่วยงาน</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(agency, index) in agencys" :key="agency.agency_id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ agency.agency_name }}</td>
                      <td>
                        <nuxt-link
                          class="btn btn-warning"
                          :to="`/admin/agency/edit/${agency.agency_id}`"
                          >แก้ไข</nuxt-link
                        >
                        <button
                          class="btn btn-danger"
                          @click="handleDelete(agency.agency_id)"
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
  layout: 'session',
  name: 'AgencyRead',
  middleware: 'auth',
  data() {
    return {
      agencys: [],
    }
  },
  mounted() {
    this.fetchAgency()
  },
  methods: {
    async fetchAgency() {
      const ip = await this.$axios.get('api/agency')
      this.agencys = ip.data.result
    },
    handleDelete(id) {
      this.$swal({
        title: 'คุณต้องการลบจริงๆ หรือไม่?',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.value) {
          try {
            const resDel = await this.$axios.delete(`api/agency/${id}`)
            if (resDel.data.status === 200) {
              await this.$swal({
                type: 'success',
                title: 'ลบสำเร็จ',
                showConfirmButton: false,
                timer: 1000,
              })
              this.fetchAgency()
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
