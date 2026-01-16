import api from './config';

export interface CompanyDetails {
    companyName: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    whatsappNumber: string;
    address: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
    };
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
    businessHours?: {
        monday?: string;
        tuesday?: string;
        wednesday?: string;
        thursday?: string;
        friday?: string;
        saturday?: string;
        sunday?: string;
    };
    aboutUs?: string;
    mission?: string;
    vision?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
}

export const companyApi = {
    get: async () => {
        const response = await api.get<{ success: boolean; data: CompanyDetails }>('/company-details');
        return response.data;
    },
};
