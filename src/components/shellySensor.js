export const shellySensorData = {
  template: `<div class="shelly-sensor">
      <div class="shelly-sensor-name">{{sensor.name}}</div>
      <div class="shelly-sensor-temperature"><i class="fa fa-thermometer-half fa-lg green icon"></i>{{sensor.temperature}} &deg;C</div>
      <div class="shelly-sensor-state" v-if="sensor.state === 'close'"><i class="fa fa-lock fa-lg green icon"></i>closed</div>
      <div class="shelly-sensor-state" v-if="sensor.state === 'open'"><i class="fa fa-unlock fa-lg red icon"></i>open</div>
      <div class="shelly-sensor-lux" v-if="sensor.lux !== null"><i class="fa fa-lightbulb-o fa-lg yellow icon"></i>{{sensor.lux}} lux</div>
    </div>`,
  props: ['sensor'],
  data: function() {
    return {}
  }
}
