import React, { useState, useEffect, useRef } from 'react';
import {
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal';
import gsap from 'gsap';

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdateName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categoryRef = useRef([]);

  useEffect(() => {
    if (categories) {
      gsap.fromTo(
        categoryRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );
    }
  }, [categories]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) return toast.error('Category name is required');
    try {
      await createCategory({ name }).unwrap();
      setName('');
      toast.success('Category created successfully');
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Error creating category');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) return toast.error('Category name is required');
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      setUpdateName('');
      setModalVisible(false);
      toast.success(`${result.name} is updated successfully`);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Error updating category');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      setModalVisible(false);
      setSelectedCategory(null);
      toast.success(`${result.name} is deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Error deleting category');
    }
  };

  return (
    <div className="p-6 md:p-12 bg-gradient-to-b from-purple-700 via-indigo-600 to-blue-500 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-700 border-b pb-4">
          Manage Categories
        </h1>
        <div className="mt-6">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories &&
          categories.map((category, index) => (
            <div
              key={category._id}
              ref={(el) => (categoryRef.current[index] = el)}
              className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-500"
            >
              <span className="text-lg font-medium text-gray-700">
                {category.name}
              </span>
              <button
                className="text-sm text-white bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none"
                onClick={() => {
                  setSelectedCategory(category);
                  setModalVisible(true);
                  setUpdateName(category.name);
                }}
              >
                Edit
              </button>
            </div>
          ))}
      </div>

      {modalVisible && (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto transform transition-transform duration-500 scale-105">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Category
            </h2>
            <CategoryForm
              value={updatingName}
              setValue={setUpdateName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Category"
              handleDelete={handleDeleteCategory}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryList;

