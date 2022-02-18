interface IOption {
  resolveTypeFunc?: Function;
}
declare function json2emap(json: any, option?: IOption): string;
export = json2emap;
