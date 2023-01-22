<script>
import "@fullcalendar/core/vdom" // solves problem with Vite
import FullCalendar from "@fullcalendar/vue"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import moment from "moment"
export default {
  name: "IndexPage",
  middleware: "auth",
  layout: "session",
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      cars: [],
      events: [],
      reserves: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        events: [],
      },
    }
  },
  mounted() {
    this.fetchCar()
    this.fetchReserve()
  },
  methods: {
    handleDateClick(arg) {
      alert("date click! " + arg.dateStr)
    },
    async fetchReserve() {
      const ip = await this.$axios.get("api/reserve/is-submit-reserve")
      this.reserves = ip.data.result
      this.events = this.reserves.map((item) => {
        return {
          title: `${item.reserve_objective} ${moment(
            item.reserve_start_date_time
          ).format("h:mm:ss a")} - ${moment(item.reserve_end_date_time).format(
            "h:mm:ss a"
          )}`,
          start: moment(item.reserve_start_date_time).format("yyyy-MM-DD"),
          end: moment(item.reserve_end_date_time).format("yyyy-MM-DD"),
          backgroundColor: `#${item.car_color_badge}`,
          borderColor: "#E5E7E9",
        }
      })
      this.calendarOptions.events = this.events
      console.log(this.events)
    },
    async fetchCar() {
      const ip = await this.$axios.get("api/car")
      this.cars = ip.data.result
    },
  },
}
</script>
<template>
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <LayoutsNavBar />
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        <div class="card px-5">
          <div class="row flex justify-content-center">
            <div v-for="car in cars" key="car.car_id">
              <div class="md-2 p-3">
                <span
                  class="badge text-white p-2"
                  :style="`background-color:#${car.car_color_badge};`"
                  >{{ car.car_brand }} รุ่น : {{ car.car_model }} ทะเบียน :
                  {{ car.car_license }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          style="width: 800px; margin: auto; margin-top: 10px; font-size: 16px"
        >
          <div class="p-3 mb-2 bg-light text-dark" id="calendar">
            <div class="card">
              <div class="card-body">
                <FullCalendar :options="calendarOptions" />
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
