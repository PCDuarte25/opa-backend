import * as bcrypt from 'bcrypt';

export class EncrypterService {
    private SALT = 7;

    async encrypt(value: string): Promise<string> {

      const hash = await bcrypt.hash(value, this.SALT);
      return hash;
    }

    async compare(value: string, hash: string): Promise<boolean> {
      return await bcrypt.compare(value, hash);
    }
}
