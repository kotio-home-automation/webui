import Vue from 'vue'
import {ruuvitagApi, tellstickSwitchApi, tellstickSensorApi, hueApi, FETCH_INTERVAL} from './config.js'
import {tagData} from './components/ruuvitag'
import {tdSensorData} from './components/tellstickSensor'
import {tdSwitchData} from './components/tellstickSwitch'
import {hueSwitchData} from './components/hueSwitch'
import {masterSwitchOnData, masterSwitchOffData} from './components/masterSwitch'
require('./index.css')

const postHeaders = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}

const toggleSwitch = async (url, deviceIds) => {
  const postBody = JSON.stringify(deviceIds)
  const response = await fetch(url, {method: 'POST', mode: 'cors', body: postBody, headers: postHeaders})
  const data = await response.json()
  app.tellstickSwitches = data
}

const toggleHueSwitch = async (url, group) => {
  const postBody = JSON.stringify({"lights": group.attributes.attributes.lights})
  const response = await fetch(url, {method: 'POST', mode: 'cors', body: postBody, headers: postHeaders })
  const data = await response.json()
  app.hueGroups = data
}

const app = new Vue({
  el: '#app',
  data: {
    ruuvitags: ruuvitagApi.enabled,
    tellstickSensors: tellstickSwitchApi.enabled,
    tellstickSwitches: tellstickSwitchApi.enabled,
    hasRuuvitagSensors: false,
    hasTellstickSensors: false,
    hasSensors: false,
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

async function fetchRuuvitagData() {
  if (ruuvitagApi.enabled) {
    const response = await fetch(ruuvitagApi.urls.ruuvitags)
    const data = await response.json()
    app.ruuvitags = sortByNameAsceding(data)

    if (data.length > 0) {
      app.hasRuuvitagSensors = true
      app.hasSensors = true
    }
  }
}

async function fetchTellstickSwitchData() {
  if (tellstickSwitchApi.enabled) {
    const response = await fetch(tellstickSwitchApi.urls.tellstickSwitches)
    const data = await response.json()
    const devices = sortByNameAsceding(data.devices)
    const groups = sortByNameAsceding(data.groups)
    app.tellstickSwitches = {devices, groups}

    if (data.devices.length > 0) {
      app.hasSwitches = true
      app.hasControllables = true
    }

    if (data.groups.length > 0) {
      app.hasSwitchGroups = true
      app.hasControllables = true
    }
  }
}

async function fetchTellstickSensorData() {
  if (tellstickSensorApi.enabled) {
    const response = await fetch(tellstickSensorApi.urls.tellstickSensors)
    const data = await response.json()
    app.tellstickSensors = sortByNameAsceding(data)

    if (data.length > 0) {
      app.hasTellstickSensors = true
      app.hasSensors = true
    }
  }
}

async function fetchHueData() {
  if (hueApi.enabled) {
    await fetch(hueApi.urls.init, {headers: postHeaders})
    const response = await fetch(hueApi.urls.hueGroups)
    const data = await response.json()
    app.hueGroups = data

    if (data.length > 0) {
      app.hasHueGroups = true
      app.hasControllables = true
    }
  }
}

function sortByNameAsceding(data) {
  return data.sort(function (a, b) {
    const aName = a.name.toUpperCase()
    const bName = b.name.toUpperCase()

    if (aName < bName) {
      return -1
    } else if (aName > bName) {
      return 1
    }
    return 0
  })
}

function fetchData() {
  fetchRuuvitagData()
  fetchTellstickSwitchData()
  fetchTellstickSensorData()
  fetchHueData()
}

fetchData()

setInterval(fetchData, FETCH_INTERVAL)
