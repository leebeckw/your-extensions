import { ImmutableObject } from "seamless-immutable";

export interface Config {
    instructText: Array<string>;
    layerUrls: Array<string>;
}

export type IMConfig = ImmutableObject<Config>;