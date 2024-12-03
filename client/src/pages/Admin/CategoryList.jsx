import React, { useState } from 'react'
import { useUpdateCategoryMutation, useCreateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery()
  const [name, setName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updatingName, setUpdateName] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    if (!name) return toast.error("Category name is required")
    try {
      await createCategory({ name }).unwrap()
      setName("")
      toast.success("Category created successfully")
    } catch (error) {
      console.error(error)
      toast.error(error?.data?.message || "Error creating category")
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    if (!updatingName) return toast.error("Category name is required")
    try {
      const result = await updateCategory({ categoryId: selectedCategory._id, updatedCategory: { name: updatingName } }).unwrap()
      setUpdateName("")
      setModalVisible(false)
      toast.success(`${result.name} is updated successfully`)
    } catch (error) {
      console.error(error)
      toast.error(error?.data?.message || "Error updating category")
    }
  }

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap()
      setModalVisible(false)
      setSelectedCategory(null)
      toast.success(`${result.name} is deleted successfully`)
    } catch (error) {
      console.error(error)
      toast.error(error?.data?.message || "Error deleting category")
    }
  }

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className='md:w-3/4 p-3'>
        <div className='h-12'>
          <h1 className='text-2xl font-semibold'>Manage Category</h1>
          <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
          <br />
          <hr />
          <div className='flex flex-wrap'>
            {categories && categories.map((category) => (
              <div key={category._id}>
                <button
                  className='bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-4 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50'
                  onClick={() => {
                    setSelectedCategory(category)
                    setModalVisible(true)
                    setUpdateName(category.name)
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={updatingName}
              setValue={setUpdateName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Category"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default CategoryList
