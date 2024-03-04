import { ChangeEvent, useState } from "react"

interface CheckboxType {
  id: string,
  label: string,
  checked: boolean
}

interface InitialStateType {
  checkboxes: CheckboxType[],
  selectAll: boolean
}

function App() {

  const [state, setState] = useState<InitialStateType>({
    checkboxes: [
      { id: "1", label: 'India', checked: false },
      { id: "2", label: 'USA', checked: false },
      { id: "3", label: 'France', checked: false },
    ],
    selectAll: false
  });


  const handleCheckboxChange = (elem: ChangeEvent<HTMLInputElement>) => {
    const {target: {id, checked}} = elem
    const updatedCheckboxes = state.checkboxes.map(check => check.id === id ? {...check, checked} : check)

    const allChecked = updatedCheckboxes.every(checkbox => checkbox.checked);
    const allUnchecked = updatedCheckboxes.every(checkbox => !checkbox.checked);

    setState((prevState: InitialStateType) => ({...prevState, checkboxes: updatedCheckboxes, selectAll: allChecked && !allUnchecked }))
  };

  const handleAllCheckboxChange = (elem: ChangeEvent<HTMLInputElement>) => {
    const {target: {checked}} = elem
    const updatedCheckboxes = state.checkboxes.map(check => ({...check,checked}))

    setState((prevState: InitialStateType) => ({...prevState, checkboxes: updatedCheckboxes, selectAll: checked}))
  }

  return (
    <main>
      <div>
        <label htmlFor="all">Select All</label>
        <input 
          type="checkbox" 
          name="all" 
          id="all" 
          checked={state.selectAll}
          onChange={handleAllCheckboxChange}
        />
      </div>
      {state.checkboxes.map(({id,label,checked}) => <div key={id}>
        <label htmlFor={id}>{label}</label>
        <input 
          type="checkbox"
          name={label}
          checked={checked}
          id={id} 
          onChange={handleCheckboxChange}
        />
      </div>)}
    </main>
  )
}

export default App
