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
            <h1 class="h3 mb-0 text-gray-800">คนดูแลรถทั้งหมด</h1>
          </div>
          <div class="p-2 bd-highlight">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              เพิ่มผู้ดูแล
            </button>
            <NuxtLink to="/admin/cars"
                  ><button class="btn">ยกเลิก</button>
                </NuxtLink>
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
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
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
                  <div class="form-group">
                    <label for="inputPassword" class="col-sm-12 col-form-label"
                      >เลือกพนักงาน</label
                    >
                    <div class="col-sm-10">
                      <select class="form-control" v-model="form.chauffeur_id">
                        <option
                          v-for="chauffeur in chauffeurs"
                          :value="chauffeur.chauffeur_id"
                        >
                          {{
                            chauffeur.chauffeur_fname +
                            " " +
                            chauffeur.chauffeur_lname
                          }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addChauffeurCare()"
                    >
                      เพิ่ม
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                      <th scope="col">ชื่อ-นามสกุล</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(chauffeur_care, index) in chauffeur_cares"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ chauffeur_care.chauffeur_fname+" "+chauffeur_care.chauffeur_lname }}</td>
                      <td>                        
                        <button
                          class="btn btn-danger"
                          @click="handleDelete(chauffeur_care.id)"
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
  name: "CareCarById",
  middleware: "auth",
  data() {
    return {
      chauffeur_cares: [],
      chauffeurs: [],
      form: {
        chauffeur_id: 0,
      },
    }
  },
  mounted() {
    this.fetchCare()
    this.fetchChauffeur()
  },
  methods: {
    async addChauffeurCare() {
      console.log(this.form)
      const ip = await this.$axios.post("api/care", {
        chauffeur_id: this.form.chauffeur_id,
        car_id: this.$route.params.id,
      })
      if (ip.data.status == 200) {
        await this.$swal({
          type: "success",
          title: "อัพเดทสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        })
        this.fetchCare()
        $("#exampleModal").modal("hide")
      } else {
        this.$swal({
          type: "error",
          title: "อัพเดทไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
    async fetchChauffeur() {
      const ip = await this.$axios.get("api/chauffeur")
      this.chauffeurs = ip.data.result
    },
    async fetchCare() {
      const ip = await this.$axios.get(`api/care/${this.$route.params.id}`)
      console.log(ip)
      this.chauffeur_cares = ip.data.result
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
            const resDel = await this.$axios.delete(`api/care/${id}`)
            if (resDel.data.msg === "success") {
              await this.$swal({
                type: "success",
                title: "ลบสำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              })
              this.fetchCare()
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
