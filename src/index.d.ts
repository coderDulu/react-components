declare module '*.module.scss';
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}