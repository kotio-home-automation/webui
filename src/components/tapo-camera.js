export const tapoCameraData = {
    template: `<div class="camera">
        <div class="camera-status">
            <i v-if="camera.privacy_enabled" class="fa fa-video-camera fa-lg red"></i>
            <i v-else class="fa fa-video-camera fa-lg green"></i>
        </div>
        <a :href="'rtsp://' + camera.host + '/stream1'" class="camera-name">{{camera.name}}</a>
    </div>`,
    props: ['camera'],
    data: function() {
        return {}
    }
}
