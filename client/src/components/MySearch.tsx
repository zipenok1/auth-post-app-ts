import '../styles/MySearch.css'

interface ISearchProps{
    value: string,
    onChange: (value: string) => void;
}

function MySearch({value, onChange}: ISearchProps) {

  return (
    <div className='my-search'>
        <input 
            type="text" 
            placeholder='поиск по названию...'
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  )
}

export default MySearch