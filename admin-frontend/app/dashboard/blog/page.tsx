"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";
import { Plus, Edit, Trash2, Eye, Search, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { blogsApi, blogCategoriesApi, Blog, Category } from "@/lib/api";
import { formatDate } from "@/lib/utils/formatters";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const statuses = ["All", "Published", "Draft"];

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    featuredImage: "",
    tags: [] as string[],
    readTime: "",
    isPublished: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [blogsRes, categoriesRes] = await Promise.all([
        blogsApi.getAll({ page: 1, limit: 100 }),
        blogCategoriesApi.getAll(),
      ]);
      setBlogs(blogsRes.data.blogs);
      setCategories(categoriesRes.data);
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (typeof blog.category === "object" &&
        blog.category._id === selectedCategory);
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Published" ? blog.isPublished : !blog.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingBlog) {
        await blogsApi.update(editingBlog._id, formData);
        toast.success("Blog post updated successfully!");
      } else {
        await blogsApi.create(formData);
        toast.success("Blog post created successfully!");
      }

      setShowForm(false);
      setEditingBlog(null);
      resetForm();
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: categories[0]?._id || "",
      author: "",
      featuredImage: "",
      tags: [],
      readTime: "",
      isPublished: false,
    });
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content || "",
      category:
        typeof blog.category === "object" ? blog.category._id : blog.category,
      author: blog.author,
      featuredImage: blog.featuredImage,
      tags: blog.tags || [],
      readTime: blog.readTime || "",
      isPublished: blog.isPublished,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await blogsApi.delete(id);
      toast.success("Blog post deleted successfully!");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  const togglePublish = async (id: string) => {
    try {
      await blogsApi.togglePublish(id);
      toast.success("Publish status updated!");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Blog Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Blog Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-admin-800">
              Manage Blog Posts
            </h2>
            <p className="text-admin-600">
              Create and manage your blog content
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
          </button>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field md:w-48"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field md:w-48"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Title</th>
                  <th className="table-header">Category</th>
                  <th className="table-header">Author</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Views</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog, index) => (
                  <motion.tr
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-saffron-100 to-saffron-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {blog.featuredImage && (
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-admin-800 line-clamp-1">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-admin-500 line-clamp-1">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="px-2 py-1 bg-admin-100 text-admin-700 rounded-full text-sm">
                        {typeof blog.category === "object"
                          ? blog.category.name
                          : "N/A"}
                      </span>
                    </td>
                    <td className="table-cell">{blog.author}</td>
                    <td className="table-cell">
                      <span
                        className={`status-badge ${
                          blog.isPublished ? "status-active" : "status-draft"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-admin-400" />
                        <span>{blog.views}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-1 text-sm text-admin-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {blog.publishedAt
                            ? formatDate(blog.publishedAt)
                            : "Not published"}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => togglePublish(blog._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            blog.isPublished
                              ? "text-green-600 hover:bg-green-50"
                              : "text-admin-400 hover:bg-admin-50"
                          }`}
                          title="Toggle Publish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingBlog(null);
            resetForm();
          }}
          title={editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          size="2xl"
        >
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">
                Basic Information
              </h4>
              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="input-field"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Content *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="input-field"
                  placeholder="Write your blog post content here..."
                />
              </div>
            </div>

            {/* Post Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">
                Post Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="input-field"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </div>
            </div>

            {/* Media & SEO */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">
                Media & SEO
              </h4>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(value) =>
                  setFormData({ ...formData, featuredImage: value as string })
                }
                label="Featured Image"
                required={true}
                multiple={false}
              />

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="input-field"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-4 h-4 text-saffron-600 border-gray-300 rounded focus:ring-saffron-500"
                />
                <label
                  htmlFor="isPublished"
                  className="text-sm font-medium text-admin-700"
                >
                  Publish Immediately
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-admin-200">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBlog(null);
                  resetForm();
                }}
                className="btn-mobile px-6 py-2 text-admin-600 hover:bg-admin-100 rounded-lg transition-colors order-2 sm:order-1"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary btn-mobile order-1 sm:order-2"
                disabled={submitting}
              >
                {submitting ? "Saving..." : editingBlog ? "Update" : "Create"}{" "}
                Post
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default BlogManagement;
