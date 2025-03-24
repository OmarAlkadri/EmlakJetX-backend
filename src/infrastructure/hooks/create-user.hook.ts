// src/modules/users/hooks/create-user.hook.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserHook {
    async beforeCreate(userData: any) {
        // Validate data before creating the user
        if (!userData.email) {
            throw new Error('Email is required');
        }
        // Check if the user already exists
        const userExists = await this.checkIfUserExists(userData.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        console.log('Data validation successful before creating the user');
    }

    private async checkIfUserExists(email: string): Promise<boolean> {
        // Logic to check if the user exists
        return false; // For example, return false if no user exists with the same email
    }

    async afterCreate(userData: any) {
        // After creating the user, send a notification or log an event.
        console.log(`User created successfully: ${userData.email}`);
        await this.sendWelcomeEmail(userData);
    }

    private async sendWelcomeEmail(userData: any) {
        // Logic to send a welcome email
        console.log(`Sending welcome email to: ${userData.email}`);
    }

    async onError(error: any) {
        // Custom error handling
        console.error(`An error occurred while creating the user: ${error.message}`);
        // We can also notify administrators or log the error in a monitoring system
    }
}
