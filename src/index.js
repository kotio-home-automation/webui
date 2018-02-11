import Vue from 'vue'
import {ruuvitagApi, tellstickApi, hueApi, FETCH_INTERVAL} from './config.js'
import {tagData} from './components/ruuvitag'
import {tdSensorData} from './components/tellstickSensor'
import {tdSwitchData} from './components/tellstickSwitch'
import {hueSwitchData} from './components/hueSwitch'
import {masterSwitchOnData, masterSwitchOffData} from './components/masterSwitch'
require('./index.css')

const postHeaders = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}

const toggleSwitch = (url, deviceIds) => {
  const postBody = JSON.stringify(deviceIds)
  return fetch(url, {method: 'POST', mode: 'cors', body: postBody, headers: postHeaders})
    .then(response => response.json())
    .then(data => app.tellstickSwitches = data)
}

const toggleHueSwitch = (url, group) => {
  const postBody = JSON.stringify({"lights": group.attributes.attributes.lights});
  return fetch(url, {method: 'POST', mode: 'cors', body: postBody, headers: postHeaders })
    .then(response => response.json())
    .then(data => app.hueGroups = data)
}

const app = new Vue({
  el: '#app',
  data: {
    ruuvitags: ruuvitagApi.enabled,
    tellstickSensors: tellstickApi.enabled,
    tellstickSwitches: tellstickApi.enabled,
    hasSensors: ruuvitagApi.enabled,
    hasSwitches: false,
    hasSwitchGroups: false,
    hueGroups: hueApi.enabled,
    hasHueGroups: false,
    hasControllables: false
  },
  components: {
    'ruuvitag': tagData,
    'tdsensor': tdSensorData,
    'tdswitch': tdSwitchData(toggleSwitch),
    'hueswitch': hueSwitchData(toggleHueSwitch),
    'masterswitch-on': masterSwitchOnData(toggleSwitch),
    'masterswitch-off': masterSwitchOffData(toggleSwitch)
  }
})

function fetchRuuvitagData() {
  if (ruuvitagApi.enabled) {
    fetch(ruuvitagApi.urls.ruuvitags)
      .then(response => response.json())
      .then(data => app.ruuvitags = data)
  }
}

function fetchTellstickData() {
  if (tellstickApi.enabled) {
    fetch(tellstickApi.urls.tellstickSensors)
      .then(response => response.json())
      .then(data => {
        app.tellstickSensors = data

        if (data.length > 0) {
          app.hasSensors = true
        }
      })

    fetch(tellstickApi.urls.tellstickSwitches)
      .then(response => response.json())
      .then(data => {
        app.tellstickSwitches = data

        if (data.devices.length > 0) {
          app.hasSwitches = true
          app.hasControllables = true
        }

        if (data.groups.length > 0) {
          app.hasSwitchGroups = true
          app.hasControllables = true
        }
      })
  }
}

function fetchHueData() {
  if (hueApi.enabled) {
    // app.hueSwitches = 'Jee'
    fetch(hueApi.urls.init, {headers: postHeaders}).then(initdata => {
      fetch(hueApi.urls.hueGroups)
      .then(response => response.json())
      .then(data => {
        app.hueGroups = data

        if (data.length > 0) {
          app.hasHueGroups = true
          app.hasControllables = true
        }
      })
    })
  }
}

function fetchData() {
  fetchRuuvitagData()
  fetchTellstickData()
  fetchHueData()
}

fetchData()

setInterval(fetchData, FETCH_INTERVAL)
