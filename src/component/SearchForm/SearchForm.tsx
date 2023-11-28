import { generationList, sortList, typesList } from '@/utlis/optionList'
import { useSearchform } from '.'



const SearchForm = () => {
  const { fieldKeyword, fieldGeneration, fieldType, fieldKSort } = useSearchform()
  return (
    <form className='grid grid-cols-4 gap-x-[20px]'>
      <div>
        <label htmlFor="generation" className="block mb-2 text-mb font-medium text-white" >Generation</label>
        <select {...fieldGeneration} id="generation" className="bg-[#162150] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {generationList.map((item, index) => {
            return <option key={`generation-key-${index}`} value={index} >{item.name}</option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="type" className="block mb-2 text-mb font-medium text-white" >Type</label>
        <select {...fieldType} id="type" className="bg-[#162150] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {typesList.map((item, index) => {
            return <option key={`type-key-${index}`} className='capitalize' value={item} >{item}</option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="sort" className="block mb-2 text-mb font-medium text-white" >Sort by</label>
        <select {...fieldKSort} id="sort" className="bg-[#162150] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {sortList.map((item, index) => {
            return <option key={`type-key-${index}`} className='capitalize' value={item} >{item}</option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="search" className="block mb-2 text-mb font-medium text-white" >Search</label>
        <input
          {...fieldKeyword}
          id="search" className="bg-[#162150] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
    </form>
  )
}

export default SearchForm