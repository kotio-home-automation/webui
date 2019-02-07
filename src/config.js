const TELLSTICK_API_URL = 'http://localhost:5001'
const RUUVITAG_API_URL = 'http://localhost:5000'
const HUE_API_URL = 'http://localhost:3103'

export const FETCH_INTERVAL = 30000

export const ruuvitagApi = {
  enabled: false,
  urls: {
    ruuvitags: `${RUUVITAG_API_URL}/ruuvitag`
  }
}

export const tellstickSwitchApi = {
  enabled: true,
  urls: {
    tellstickSwitches: `${TELLSTICK_API_URL}/tellstick/devices`,
    turnOnSwitch: `${TELLSTICK_API_URL}/tellstick/devices/on`,
    turnOffSwitch: `${TELLSTICK_API_URL}/tellstick/devices/off`
  }
}

export const tellstickSensorApi = {
  enabled: false,
  urls: {
    tellstickSensors: `${TELLSTICK_API_URL}/tellstick/sensors`,
  }
}

export const hueApi = {
  enabled: false,
  urls: {
    turnOnSwitch: `${HUE_API_URL}/turnon`,
    turnOffSwitch: `${HUE_API_URL}/turnoff`,
    init: `${HUE_API_URL}/findbridges`,
    hueLights: `${HUE_API_URL}/lights`,
    hueGroups: `${HUE_API_URL}/groups`
  }
}
