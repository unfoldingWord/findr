import XRegeExp from 'xregexp/types';

export interface FindrConfig {
  // TODO: Add config to make use of xregexp optional
  ctxLen?: number;
  /** function for wrapping or transforming the matched word in context.*/
  filterCtxMatch?: (match: string) => string;
  /** function for wrapping or transforming the replacement word in context.*/
  filterCtxReplacement?: (replacement: string) => string;
  buildResultKey?: (index: number) => resultKey;
  xregexp?: typeof XRegeExp;
  isRegex?: boolean;
  isCaseMatched?: boolean;
  isWordMatched?: boolean;
  isCasePreserved?: boolean;
}

export type resultKey = string | number;
export type metadata = { [key: string]: unknown };
export type replacementCallback = (params: {
  index: number;
  match: string;
  groups: Array<string>;
  position: number;
  source: string;
  namedGroups: { [key: string]: unknown };
}) => string;

export interface FindrParams {
  source: string;
  target: string | RegExp;
  replacement?: string | replacementCallback;
  contextLength?: number;
  replacementKeys?: Array<resultKey> | string;
  metadata?: metadata;
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
  resultKey: resultKey;
  metadata: metadata;
}
