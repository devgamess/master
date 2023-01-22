<template>
  <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  name: 'CalendarComponent',
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
    }
  },
}
</script>
