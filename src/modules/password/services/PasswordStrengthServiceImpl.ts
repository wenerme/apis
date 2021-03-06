import { PasswordStrengthService } from 'src/modules/client';

export class PasswordStrengthServiceImpl implements PasswordStrengthService {
  _getZxcnbn() {
    return import('zxcvbn').then((v) => v.default);
  }

  async zxcvbn(password): Promise<any> {
    return (await this._getZxcnbn())(password);
  }
}
