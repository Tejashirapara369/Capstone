export type LoginPayload = {
    email: string;
    password: string;
};

export type LoginResponse = {
    status: string;
    token: string;
    data: {
        user: User;
    };
};

export class User {
    _id!: string;
    name!: string;
    email!: string;
    photo!: string;
    roles!: UserRole;
    active!: boolean;
    passwordChanged!: string;
}

export enum UserRole {
    admin = 'admin',
    user = 'user',
    guide = 'guide',
    leadGuide = 'lead-guide'
}