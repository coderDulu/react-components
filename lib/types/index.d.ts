/// <reference types="react" />
interface propsType {
    children: any;
    style?: any;
    className?: any;
    onContextMenu?: (e: any) => void;
    isAuto?: boolean;
}
export default function autoScroll(props: propsType): JSX.Element;
export {};
