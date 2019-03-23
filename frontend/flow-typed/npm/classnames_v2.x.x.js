// flow-typed signature: cf86673cc32d185bdab1d2ea90578d37
// flow-typed version: 614bf49aa8/classnames_v2.x.x/flow_>=v0.25.x

declare module 'classnames' {
    declare type Classes = string | { [className: string]: boolean } | false | void | null;

    declare module.exports: (...classes: Array<Classes | Classes[]>) => string;
}
