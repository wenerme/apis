export abstract class PasswordStrengthService {
  static service = 'me.wener.apis.password.PasswordStrengthService';

  abstract zxcvbn(password: string): Promise<any>;
}
