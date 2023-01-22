<template lang="">
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <NuxtLink
          to="/"
          class="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fa fa-bus" aria-hidden="true"></i>
          </div>
          <div class="sidebar-brand-text mx-3">CAR BRU</div>
        </NuxtLink>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <li
          class="nav-item active"
          v-if="
            $store.state.auth.currentUser.role != 'admin' &&
            $store.state.auth.currentUser.submit_car != '1'
          "
        >
          <NuxtLink class="nav-link" to="/reserves/addReserve">
            <i class="fas fa-fw fa-solid fa-plus"></i>
            <span>จองรถ</span>
          </NuxtLink>
        </li>

        <li class="nav-item active">
          <NuxtLink class="nav-link" to="/reserve">
            <i class="fas fa-fw fa-list"></i>
            <span>รายการจองรถ</span>
          </NuxtLink>
        </li>

        <li class="nav-item active">
          <NuxtLink class="nav-link" to="/listCar">
            <i class="fas fa-fw fa-solid fa-car"></i>
            <span>ยานพาหนะ</span>
          </NuxtLink>
        </li>

        <li class="nav-item active">
          <NuxtLink class="nav-link" to="/listChauffeur">
            <i class="fas fa-fw fa-user"></i>
            <span>พนักงานขับรถ</span>
          </NuxtLink>
        </li>

        <li class="nav-item active">
          <a class="nav-link" href="#" @click="handleLogout">
            <i class="fas fa-fw fa-sign-out-alt"></i>
            <span>ออกจากระบบ</span></a
          >
        </li>

        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div
          class="sidebar-heading"
          v-if="$store.state.auth.currentUser.role == 'admin'"
        >
          Addmin
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li
          class="nav-item"
          v-if="$store.state.auth.currentUser.role == 'admin'"
        >
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>ข้อมูลพื้นฐาน</span>
          </a>
          <div
            id="collapsePages"
            class="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <NuxtLink class="collapse-item" to="/admin/user"
                >ข้อมูลผู้ใช้</NuxtLink
              >

              <NuxtLink class="collapse-item" to="/admin/rank"
                >ตำแหน่ง</NuxtLink
              >
              <NuxtLink class="collapse-item" to="/admin/agency"
                >หน่วยงาน</NuxtLink
              >
              <NuxtLink class="collapse-item" to="/admin/cars"
                >ยานพาหนะ</NuxtLink
              >
              <NuxtLink class="collapse-item" to="/admin/chauffeur"
                >พนักงานขับรถ</NuxtLink
              >
            </div>
          </div>
        </li>

        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <Nuxt />
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ออกจากระบบ</h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">คุณยืนยันที่จะออกจากระบบ</div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              ยกเลิก
            </button>
            <a class="btn btn-primary" @click="handleLogout">ยืนยัน</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex"
export default {
  name: "SessionLayout",

  mounted() {
    this.fetchUserMe()
  },
  methods: {
    async handleLogout() {
      try {
        await this.$auth.logout()
        this.$router.replace({ path: "/login" })
      } catch (error) {}
    },
    ...mapActions({
      setUser: "auth/userAuth",
    }),
    async fetchUserMe() {
      try {
        const ip = await this.$axios.get("api/auth/userMe")
        if (ip.data !== "") {
          this.setUser(ip.data)
        } else {
          this.$router.replace({ path: "/login" })
        }
      } catch (error) {}
    },
  },
}
</script>
<style lang=""></style>
