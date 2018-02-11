import {hueApi} from '../config.js'

export const hueSwitchData = (toggleHueSwitch) => ({
  template: `<div v-if="group.state.attributes.any_on" class="switch clickable" v-on:click="turnOff(group)">
      <div class="switch-status">
        <i class="fa fa-power-off fa-lg green icon"></i>
      </div>
      <div class="switch-name">{{group.attributes.attributes.name}}</div>
      </div>
    <div v-else class="switch clickable" v-on:click="turnOn(group)">
      <div class="switch-status">
        <i class="fa fa-power-off fa-lg red icon"></i>
      </div>
      <div class="switch-name">{{group.attributes.attributes.name}}</div>
    </div>`,
  props: ['group'],
  data: function() {
    return {}
  },
  methods: {
    turnOn: function(group) {
      toggleHueSwitch(hueApi.urls.turnOnSwitch, group)
    },
    turnOff: function(group) {
      toggleHueSwitch(hueApi.urls.turnOffSwitch, group)
    }
  }
})
