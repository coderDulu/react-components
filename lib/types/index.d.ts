/// <reference types="react" />
import './index.less';
import './font_fio1nvrgo2/iconfont';
import flvjs from 'flv.js';
interface PropTypes {
    className?: string;
    style?: any;
}
export default function index({ className, style, type, url, ...args }: PropTypes & flvjs.MediaDataSource): JSX.Element;
export {};
