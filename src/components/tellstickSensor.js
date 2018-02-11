export const tdSensorData = {
  template: `<div class="sensor">
      <div class="sensor-name">{{sensor.name}}</div>
      <div class="sensor-temperature"><i class="fa fa-thermometer-half fa-lg green icon"></i>{{sensor.temperature}} &deg;C</div>
      <div class="sensor-humidity" v-if="sensor.humidity"><i class="fa fa-tint fa-lg blue icon"></i>{{sensor.humidity}}%</div>
    </div>`,
  props: ['sensor'],
  data: function() {
    return {}
  }
}
