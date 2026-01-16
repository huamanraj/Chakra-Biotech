import { apiRequest } from './config';

export interface BlogComment {
  _id: string;
  blog: string | { _id: string; title: string; slug: string };
  name: string;
  email: string;
  comment: string;
  parentComment?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentsResponse {
  success: boolean;
  data: {
    comments: BlogComment[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export const commentsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    blog?: string;
    isApproved?: boolean;
  }): Promise<CommentsResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.blog) queryParams.append('blog', params.blog);
    if (params?.isApproved !== undefined) queryParams.append('isApproved', params.isApproved.toString());

    return await apiRequest(`/admin/comments?${queryParams.toString()}`);
  },

  approve: async (id: string): Promise<{ success: boolean; data: BlogComment; message: string }> => {
    return await apiRequest(`/admin/comments/${id}/approve`, {
      method: 'PUT',
    });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return await apiRequest(`/admin/comments/${id}`, {
      method: 'DELETE',
    });
  },
};
