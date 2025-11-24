import { v4 as uuidv4 } from 'uuid';

export interface CaptchaToken {
  token: string;
  createdAt: number;
  expiresAt: number;
  completed: boolean;
  level: number;
}

class CaptchaStore {
  private tokens: Map<string, CaptchaToken> = new Map();
  private readonly EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

  generateToken(): CaptchaToken {
    const token = uuidv4();
    const now = Date.now();

    const captchaToken: CaptchaToken = {
      token,
      createdAt: now,
      expiresAt: now + this.EXPIRATION_TIME,
      completed: false,
      level: 1
    };

    this.tokens.set(token, captchaToken);
    this.cleanupExpiredTokens();

    return captchaToken;
  }

  validateToken(token: string): boolean {
    const captchaToken = this.tokens.get(token);

    if (!captchaToken) {
      return false;
    }

    if (Date.now() > captchaToken.expiresAt) {
      this.tokens.delete(token);
      return false;
    }

    return captchaToken.completed;
  }

  completeToken(token: string, level: number): boolean {
    const captchaToken = this.tokens.get(token);

    if (!captchaToken) {
      return false;
    }

    if (Date.now() > captchaToken.expiresAt) {
      this.tokens.delete(token);
      return false;
    }

    captchaToken.completed = true;
    captchaToken.level = level;
    return true;
  }

  getToken(token: string): CaptchaToken | undefined {
    return this.tokens.get(token);
  }

  private cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [token, captchaToken] of this.tokens.entries()) {
      if (now > captchaToken.expiresAt) {
        this.tokens.delete(token);
      }
    }
  }
}

export const captchaStore = new CaptchaStore();
