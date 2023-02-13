/// <reference types="react" />
import './index.less';
import './font_fio1nvrgo2/iconfont';
import flvjs from 'flv.js';
interface PropTypes {
    url: string;
    className?: string;
    style?: any;
    type: "flv" | "mp4";
}
export default function index({ url, className, style, type }: PropTypes & flvjs.MediaDataSource): JSX.Element;
export {};
