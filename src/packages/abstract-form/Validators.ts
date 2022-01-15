export interface ValidatorError {
  [key: string]: any;
}
export type Validator = (value: any) => ValidatorError | null;

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}

const EMAIL_REGEXP =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export class Validators {
  /**
   * 验证最小值
   * @param min
   */
  static min(min: number): Validator {
    return (value: any): ValidatorError | null => {
      if (isEmptyInputValue(value) || isEmptyInputValue(min)) {
        return null;
      }
      value = parseFloat(value);
      return !isNaN(value) && value < min ? {'min': {'min': min, 'actual': value}} : null;
    }
  }

  /**
   * 验证最大值
   * @param max
   */
  static max(max: number): Validator {
    return (value: any): ValidatorError | null => {
      if (isEmptyInputValue(value) || isEmptyInputValue(max)) {
        return null;
      }
      value = parseFloat(value);
      return !isNaN(value) && value > max ? {'max': {'max': max, 'actual': value}} : null;
    }
  }

  /**
   * 验证必选
   * @param value
   */
  static required(value: any): ValidatorError | null {
    return isEmptyInputValue(value) ? {required: true} : null;
  }

  /**
   * 验证值必选且为true
   * @param value
   */
  static requiredTrue(value: any): ValidatorError | null {
    return value === true ? null : {required: true};
  }

  /**
   * 验证是邮件
   * @param value
   */
  static email(value: any): ValidatorError | null {
    if (isEmptyInputValue(value)) {
      return null;
    }
    return EMAIL_REGEXP.test(value) ? null : {'email': true};
  }

  /**
   * 最小长度
   * @param minLength
   */
  static minLength(minLength: number): Validator {
    return (value: any): ValidatorError|null => {
      if (isEmptyInputValue(value) || !hasValidLength(value)) {
        return null;
      }

      return value.length < minLength ?
          {'minlength': {'requiredLength': minLength, 'actualLength': value.length}} :
          null;
    };
  }

  /**
   * 最大长度
   * @param maxLength
   */
  static maxLength(maxLength: number): Validator {
    return (value: any): ValidatorError|null => {
      return hasValidLength(value) && value.length > maxLength ?
          {'maxlength': {'requiredLength': maxLength, 'actualLength': value.length}} :
          null;
    };
  }

  /**
   * 正则表达式检查
   * @param pattern
   */
  static pattern(pattern: string|RegExp): Validator {
    if (!pattern) return Validators.nullValidator;
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') regexStr += '^';

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (value: any): ValidatorError|null => {
      if (isEmptyInputValue(value)) {
        return null;  // don't validate empty values to allow optional controls
      }
      value = value + '';
      return regex.test(value) ? null :
          {'pattern': {'requiredPattern': regexStr, 'actualValue': value}};
    };
  }

  static nullValidator(value: any): ValidatorError|null {
    return null;
  }

}

