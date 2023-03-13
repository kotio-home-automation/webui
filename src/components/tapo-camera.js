export const tapoCameraData = {
    template: `<div class="camera">
        <div class="camera-status">
            <i v-if="camera.privacy_enabled" class="fa fa-camera fa-lg icon red"></i>
            <i v-else class="fa fa-camera fa-lg icon green"></i>
        </div>
        <a :href="'rtsp://' + camera.host + '/stream1'" class="camera-name">{{camera.name}}</a>
    </div>`,
    props: ['camera'],
    data: function() {
        return {}
    }
}
