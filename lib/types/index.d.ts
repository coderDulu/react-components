/// <reference types="react" />
interface propsType {
    data: any[];
    itemHeight: number;
    height: number | string;
    isAuto?: boolean;
    className?: string;
    style?: any;
}
export default function virtualList(props: propsType): JSX.Element;
export {};
