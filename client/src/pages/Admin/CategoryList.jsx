import React, { useState } from "react";
import {
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");
    try {
      await createCategory({ name }).unwrap();
      setName("");
      toast.success("Category created successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Error creating category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) return toast.error("Category name is required");
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      setUpdateName("");
      setModalVisible(false);
      toast.success(`${result.name} is updated successfully`);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Error updating category");
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
      toast.error(error?.data?.message || "Error deleting category");
    }
  };

  return (
    <div className="ml-[2rem] flex flex-col md:flex-row items-start gap-8 p-4">
      <div className="md:w-3/4 p-3">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Manage Category</h1>
        <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
        <hr className="my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories &&
            categories.map((category) => (
              <motion.div
                key={category._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <button
                  className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white focus:outline-none transition-all duration-300"
                  onClick={() => {
                    setSelectedCategory(category);
                    setModalVisible(true);
                    setUpdateName(category.name);
                  }}
                >
                  {category.name}
                </button>
              </motion.div>
            ))}
        </div>
        {modalVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
              <CategoryForm
                value={updatingName}
                setValue={setUpdateName}
                handleSubmit={handleUpdateCategory}
                buttonText="Update Category"
                handleDelete={handleDeleteCategory}
              />
            </Modal>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
