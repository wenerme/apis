export interface CronValue {
  minute: CronFieldValue;
  hour: CronFieldValue;
  dayOfMonth: CronFieldValue;
  month: CronFieldValue;
  dayOfWeek: CronFieldValue;
}

export type CronFieldValue = AnyValue | AnyStepValue | RangeStepValue | StepValue | ListValue | RangeValue;

abstract class BaseFieldValue {
  unit?: string;
  type: string;
}

export class AnyValue extends BaseFieldValue {
  type: 'any';
  mark: string;

  toString() {
    return this.mark || '*';
  }
}

// 1/2
export class StepValue extends BaseFieldValue {
  type: 'step';
  interval: number;
  nth: number;

  toString() {
    return `${this.interval}/${this.nth}`;
  }
}

export class RangeStepValue extends BaseFieldValue {
  type: 'range-step';
  from: number;
  to: number;

  nth: number;

  toString() {
    return `${this.from}-${this.to}/${this.nth}`;
  }
}

export class AnyStepValue extends BaseFieldValue {
  type: 'any-step';

  nth: number;

  toString() {
    return `*/${this.nth}`;
  }
}

export class ListValue extends BaseFieldValue {
  type: 'list';
  values: number[] = [];

  toString() {
    return this.values.join(',');
  }
}

export class RangeValue extends BaseFieldValue {
  type: 'range';
  from: number;
  to: number;

  toString() {
    return `${this.from}-${this.to}`;
  }
}

export const SyntaxNodeTypes = {
  any: AnyValue,
  list: ListValue,
  range: RangeValue,
  step: StepValue,
  'range-step': RangeStepValue,
  'any-step': AnyStepValue,
};

export function plainToSyntaxClass(v) {
  const nodeType = SyntaxNodeTypes[v.type];
  if (!nodeType) {
    throw new Error(`unknown node type ${v.type}`);
  }
  return Object.assign(new nodeType(), v);
}
