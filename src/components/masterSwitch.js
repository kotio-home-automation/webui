import {tellstickApi} from '../config.js'

export const masterSwitchOffData = (toggleSwitch) => ({
  template: `<div>
      <div v-on:click="allOff(devices, switchgroups)" class="master-switch clickable">
        <div class="switch-status">
          <i class="fa fa-power-off fa-lg all-red icon clickable"></i>
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
      toggleSwitch(tellstickApi.urls.turnOffSwitch, allIds)
    }
  }
})

export const masterSwitchOnData = (toggleSwitch) => ({
  template: `<div>
      <div v-on:click="allOn(devices, switchgroups)" class="master-switch clickable">
        <div class="switch-status">
          <i class="fa fa-power-off fa-lg all-green icon clickable"></i>
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
      toggleSwitch(tellstickApi.urls.turnOnSwitch, allIds)
    }
  }
})
