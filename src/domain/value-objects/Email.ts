// ValueObjectName.ts
export class Email {
  constructor(private readonly email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  getEmail(): string {
    return this.email;
  }
}
