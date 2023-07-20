import XRegeExp from 'xregexp/types';

export declare const findr: (params: FindrParams) => FindrReturn;

export interface FindrConfig {
  ctxLen?: number;
  filterCtxMatch?: (match: string) => string;
  filterCtxReplacement?: (replacement: string) => string;
  buildResultKey?: (index: number) => ResultKey;
  xregexp?: typeof XRegeExp;
  isRegex?: boolean;
  isCaseMatched?: boolean;
  isWordMatched?: boolean;
  isCasePreserved?: boolean;
}

export type ResultKey = string | number;

export type Metadata = { [key: string]: unknown };

export type ReplacementCallback = (params: {
  index: number;
  match: string;
  groups: Array<string>;
  position: number;
  source: string;
  namedGroups: { [key: string]: unknown };
}) => string;

type ResultsAll = 'all';

export interface FindrParams {
  source: string;
  target: string | RegExp;
  replacement?: string | ReplacementCallback;
  contextLength?: number;
  replacementKeys?: Array<ResultKey> | ResultsAll;
  metadata?: Metadata;
  config?: FindrConfig;
}

export interface Context {
  before: string;
  after: string;
}

export interface FindrResult {
  match: string;
  replacement: string;
  context: Context;
  extContext: Context;
  resultKey: ResultKey;
  metadata: Metadata;
}

export type FindrReplaced = string;

export interface FindrReturn {
  replaced: FindrReplaced;
  results: FindrResult[];
}

export default findr;