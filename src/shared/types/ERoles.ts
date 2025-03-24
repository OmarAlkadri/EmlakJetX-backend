import { registerEnumType } from '@nestjs/graphql';

export enum ERoles {
    Admin = 'Admin',
    Manager = 'Manager',
    Field = 'Field',
    Staff = 'Staff',
    Employee = 'Employee',
    Supervisor = 'Supervisor',
}

registerEnumType(ERoles, {
  name: 'ERoles',
  description: 'User roles in the system',
});
