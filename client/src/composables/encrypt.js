import JSEncrypt from 'jsencrypt';
import config from '@/config';

export default function asymmetricEncrypt (text) {
  const encryptor = new JSEncrypt({ default_key_size: '4096' });
  encryptor.setPublicKey(config.publicKey);
  return encryptor.encrypt(text).toString();
}
