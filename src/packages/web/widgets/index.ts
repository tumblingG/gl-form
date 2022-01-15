import {registerService} from '../../services/register-service';

registerService.registerWidget('input', () => import(/* webpackChunkName: "form-widgets" */ './input-widget/input-widget.vue'));
registerService.registerWidget('radio', () => import(/* webpackChunkName: "form-widgets" */ './radio-widget/radio-widget.vue'));
