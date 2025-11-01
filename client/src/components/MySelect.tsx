import '../styles/MySelect.css'

interface ISelectOption{
    value: string,
    name: string
}

interface ISelectProps{
    defaultValue: string,
    options: ISelectOption[],
    value: string,
    onChange: (value: string) => void
}

function MySelect({options, defaultValue, value, onChange}: ISelectProps) {
  return (
    <div className="my-select">
      <select
          value={value}
          onChange={e => onChange(e.target.value)}
      >
          <option disabled value="">{defaultValue}</option>
          {
              options.map(el => 
                  <option key={el.value} value={el.value}>
                      {el.name}
                  </option>
              )
          }
      </select>
    </div>
  )
}

export default MySelect