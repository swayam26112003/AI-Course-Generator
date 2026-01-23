import React, { useContext } from 'react'
import { UserInputContext } from '@/_context/UserInputContext'
import CategoryList from '@/_shared/CategoryList'

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (Category) => {
    setUserCourseInput(prev => ({
      ...prev,
      Category
    }))
  }

  return (
    <div className='px-10 md:px-20'>
      <h2 className="text-2xl font-semibold mb-4">Select Course Category</h2>

      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((item) => (
          <div 
            key={item.id} 
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-blue-500 hover:bg-blue-100 cursor-pointer 
              ${userCourseInput?.Category === item.name ? 'border-blue-500 bg-blue-100' : ''}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <img 
              src={item.icon} 
              alt={item.name} 
              width={100} 
              height={100} 
              className='rounded-xl object-cover'
            />
            <h2 className="mt-2 text-md font-medium">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectCategory

