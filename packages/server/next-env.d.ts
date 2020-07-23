/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'
declare module '*.md'
declare module '*.mdx'

declare module "*.json" {
  const value: any;
  export default value;
}
