export interface ScelHeader {
  name: string;
  type: string;
  description: string;
  example: string;
}

export interface ScelContent {
  pinyins: ScelPinyin[];
  words: ScelWord[];
}

export interface ScelPinyin {
  index: number;
  pinyin: string;
}

export interface ScelWord {
  word: string;
  pinyin?: string[];
  /// index of pinyin
  pinyinIndex: number[];
}
