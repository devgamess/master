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
              <h1 class="h3 mb-0 text-gray-800">พนักงานขับรถทั้งหมด</h1>
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
                        <th scope="col">รูป</th>
                        <th scope="col">ชื่อ-นามสกุล</th>                        
                        <th scope="col">หน่วยงาน</th>                        
                        <th scope="col">เบอร์ติดต่อ</th>                                                
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(chauffeur, index) in chauffeurs" :key="chauffeur.chauffeur_id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="$store.state.auth.apiUrl+'/'+chauffeur.chauffeur_image" width="250" class="img-thumbnail" alt="..."></img></td>
                        <td>{{ chauffeur.chauffeur_fname }} {{chauffeur.chauffeur_lname}}</td>                        
                        <td>{{ chauffeur.agency_name }}</td>
                        <td>{{ chauffeur.chauffeur_phone }}</td>                                                                 
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
    name: 'Chauffeur',
    middleware: 'auth',
    data() {
      return {
        chauffeurs: [],
      }
    },
    mounted() {
      this.fetchChauffeur()
    },
    methods: {
      async fetchChauffeur() {
        const ip = await this.$axios.get('api/chauffeur')
        this.chauffeurs = ip.data.result
      },      
    },
  }
  </script>
  <style lang=""></style>
  