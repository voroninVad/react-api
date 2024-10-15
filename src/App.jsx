import { useState,useEffect } from "react"
import Card from "./components/Card"

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [year, setYear] = useState('')
  const [idChangeItem, setIdChangeItem] = useState(0)

  const [btnDel, setBtnDel] = useState(false)
  const [btnSave, setBtnSave] = useState(false)

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch('https://fd892fe3ea3da442.mokky.dev/products'); 
        const dat = await response.json(); 

        if (!response.ok) { 
          throw new Error(dat.message || 'Something went wrong'); 
        }

        setData(dat); 
      } catch (error) { 
        console.error('Error fetching:', error.message);
      }
    };
    fetchData()
    setBtnDel(false)
  }, [btnSave,btnDel])
  const addItem = async (e) =>{
    e.preventDefault()

    const newItem = {
      id: Date.now().toString(),
      name,
      price,
      year
    }

    try {
      const response = await fetch('https://fd892fe3ea3da442.mokky.dev/products', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      }); 
      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      }
      
      const data = await response.json(); 
      setData(prevData => [...prevData, data])
      setName('')
      setPrice('')
      setYear('')

    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  }

  const removeItem = async (idItem) => {
    await fetch(`https://fd892fe3ea3da442.mokky.dev/products/${idItem}`, {
      method: "DELETE"
    })
    setBtnDel(true)
  }
  const changeItem = async (id) =>{
    const response = await fetch(`https://fd892fe3ea3da442.mokky.dev/products/${id}`); 
    const data = await response.json(); 
    setName(data.name)
    setPrice(data.price)
    setYear(data.year)
    setBtnSave(true)
    setIdChangeItem(id)
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }
  const saveItem = async (e)=>{
    e.preventDefault()

    const SaveItem = {
      name,
      price,
      year
    }
    try {
      const response = await fetch(`https://fd892fe3ea3da442.mokky.dev/products/${idChangeItem}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SaveItem),
      }); 
      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      }
      
      const data = await response.json(); 
      setData(prevData => [...prevData, data])
      setName('')
      setPrice('')
      setYear('')

    } catch (error) {
      console.error('Error updating card:', error.message);
    }
    setBtnSave(false)
    alert('Изменения сохранены')
  }
  return (
    <main> 
      <div className="container">
        <form onSubmit={btnSave ? saveItem : addItem}>
          <input type="text" value={name} placeholder="Название" onChange={(e) => setName(e.target.value)} required/>
          <input type="text" value={price} placeholder="Цена" onChange={(e) => setPrice(e.target.value)} required/>
          <input type="text" value={year} placeholder="Год" onChange={(e) => setYear(e.target.value)} required/>
          
          {btnSave ? <button type="submit">Сохранить</button> : <button type="submit">Добавить</button>}
        </form>
      </div>
      <ul>
        {data.map((item) => (
          <Card key={item.id} item={item} changeItem={changeItem} removeItem={removeItem}/>
        ))}
      </ul>
    </main>
  )
}

export default App
