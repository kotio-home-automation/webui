import {tellstickSwitchApi} from '../config.js'

export const masterSwitchOffData = (toggleSwitch) => ({
  template: `<div>
      <div v-on:click="allOff(devices, switchgroups)" class="master-switch clickable">
        <div class="switch-status">
          <i class="fa fa-power-off fa-lg all-red clickable"></i>
        </div>
        <div class="switch-name">All off</div>
      </div>
    </div>`,
  props: ['devices', 'switchgroups'],
  data: function() {
    return {}
  },
  methods: {
    allOff: function(devices, switchGroups) {
      const deviceIds = devices.filter(device => device.switchedOn).map(device => device.id)
      const switchGroupIds = switchGroups.map(switchGroup => switchGroup.id)
      const allIds = deviceIds.concat(switchGroupIds)
      toggleSwitch(tellstickSwitchApi.urls.turnOffSwitch, allIds)
    }
  }
})

export const masterSwitchOnData = (toggleSwitch) => ({
  template: `<div>
      <div v-on:click="allOn(devices, switchgroups)" class="master-switch clickable">
        <div class="switch-status">
          <i class="fa fa-power-off fa-lg all-green clickable"></i>
        </div>
        <div class="switch-name">All on</div>
      </div>
    </div>`,
  props: ['devices', 'switchgroups'],
  data: function() {
    return {}
  },
  methods: {
    allOn: function(devices, switchGroups) {
      const deviceIds = devices.filter(device => !device.switchedOn).map(device => device.id)
      const switchGroupIds = switchGroups.map(switchGroup => switchGroup.id)
      const allIds = deviceIds.concat(switchGroupIds)
      toggleSwitch(tellstickSwitchApi.urls.turnOnSwitch, allIds)
    }
  }
})
