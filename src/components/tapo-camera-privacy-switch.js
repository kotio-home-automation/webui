import {tapoApi} from '../config.js'

export const cameraOffData = (cameraSwitchOff) => ({
  template: `<div>
      <div v-on:click="camerasOff()" class="master-switch clickable">
        <div class="switch-status">
          <i class="fa fa-power-off fa-lg all-red icon clickable"></i>
        </div>
        <div class="switch-name">Turn cameras off</div>
      </div>
    </div>`,
  props: [],
  data: function() {
    return {}
  },
  methods: {
    camerasOff: function() {
      cameraSwitchOff(tapoApi.urls.privacy, true)
    }
  }
})

export const cameraOnData = (cameraSwitchOn) => ({
  template: `<div>
      <div v-on:click="camerasOn()" class="master-switch clickable">
        <div class="switch-status">
          <i class="fa fa-power-off fa-lg all-green icon clickable"></i>
        </div>
        <div class="switch-name">Turn cameras on</div>
      </div>
    </div>`,
  props: [],
  data: function() {
    return {}
  },
  methods: {
    camerasOn: function() {
      cameraSwitchOn(tapoApi.urls.privacy, false)
    }
  }
})
