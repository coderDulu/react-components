/// <reference types="react" />
import './index.less';
interface propsType {
    show: boolean;
    src: string;
    onCancel: (e: any) => void;
}
export default function Modal({ show, src, onCancel }: propsType): JSX.Element;
export {};
