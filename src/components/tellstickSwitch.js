import {tellsticSwitchkApi} from '../config.js'

export const tdSwitchData = (toggleSwitch) => ({
  template: `<div v-if="device.switchedOn" v-on:click="turnOff(device.id)" class="switch clickable">
      <div class="switch-status">
        <i class="fa fa-power-off fa-lg green icon clickable"></i>
      </div>
      <div class="switch-name">{{device.name}}</div>
    </div>
    <div v-else v-on:click="turnOn(device.id)" class="switch clickable">
      <div class="switch-status clickable">
        <i class="fa fa-power-off fa-lg red icon"></i>
      </div>
      <div class="switch-name">{{device.name}}</div>
    </div>`,
  props: ['device'],
  data: function() {
    return {}
  },
  methods: {
    turnOn: function(deviceId) {
      toggleSwitch(tellstickSwitchApi.urls.turnOnSwitch, [deviceId])
    },
    turnOff: function(deviceId) {
      toggleSwitch(tellstickSwitchApi.urls.turnOffSwitch, [deviceId])
    }
  }
})
