export const tagData = {
  template: `<div class="tag">
      <div class="tag-name">{{tag.name}}</div>
      <div class="tag-temperature"><i class="fa fa-thermometer-half fa-lg green icon"></i>{{tag.data.temperature}} &deg;C</div>
      <div class="tag-humidity"><i class="fa fa-tint fa-lg blue icon"></i>{{tag.data.humidity}}%</div>
      <div class="tag-pressure" v-if="tag.data.pressure"><i class="fa fa-tachometer fa-lg green icon"></i>{{tag.data.pressure}} hPa</div>
    </div>`,
  props: ['tag'],
  data: function() {
    return {}
  }
}
