import crypto from 'crypto';

export default function checkPassword(
  inputPassword: string,
  localPassword: string
) {
  const password = crypto
    .createHash('md5')
    .update(inputPassword, 'utf-8')
    .digest('hex');

  return password === localPassword;
}
