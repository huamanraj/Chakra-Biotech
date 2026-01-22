import api from './config';

export interface AdminProfile {
    id: string;
    email: string;
    name: string;
    role: string;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface UpdateProfileData {
    email?: string;
    name?: string;
}

export const adminApi = {
    // Get current admin profile
    getProfile: async () => {
        const response = await api.get<{ success: boolean; data: AdminProfile }>('/admin/manage/profile');
        return response.data;
    },

    // Update admin profile (email/name)
    updateProfile: async (data: UpdateProfileData) => {
        const response = await api.put<{ success: boolean; data: AdminProfile; message: string }>('/admin/manage/profile', data);
        return response.data;
    },

    // Change password
    changePassword: async (data: ChangePasswordData) => {
        const response = await api.put<{ success: boolean; message: string }>('/admin/manage/change-password', data);
        return response.data;
    },
};
