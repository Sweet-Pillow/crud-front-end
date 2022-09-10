import React, { useEffect, useState } from 'react'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'


const App = () =>{
  const [items, setItems] = useState([])
  const [infoChamada, setInfoChamada] = useState({})

  const getItems = () => {
    fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/')
      .then(response => response.json())
      .then(items => {
        console.log(items) 
        setItems(items)})
      .catch(err => console.log(err))
  }
  
  const addItemToState = (item) => {
    console.log(item)
    setItems(prevState => [...prevState, item])
  }

  const updateState = (item) => {
    setItems(prevState => prevState.map(
      (t) => 
        (t.id === item.id? (t = item) : t)
    ))
  }

  const deleteItemFromState = (id) => {
    console.log('Deletado: '+ id)
    setItems((prevState) => prevState.filter((t) => t.id !== id))
  }

  const verificarChamada = () => {
    fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/chamada-em-andamento')
        .then(resp => {
            return resp.json()
        })
        .then(data => {
          setInfoChamada(data)
          console.log(data)
        })
        .catch(err => console.log('Catch: ', err))
  }

  useEffect(() => {getItems()}, [])
  useEffect(() => {verificarChamada()}, [])

  return (
    <div className="App bg-slate-100 mx-10 font-roboto">
      <div className='flex flex-row justify-between items-center py-5 px-5'>
        <h1 className='text-5xl pb-1 '>Contatos</h1>
        <ModalForm buttonLabel="Cadastrar" id="botao-cadastrar" addItemToState={addItemToState} tipo="AddEdit"/>
      </div>
      <div>
        <div className="overflow-x-auto relative mx-5">
          <DataTable infoChamada={infoChamada} items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </div>
      </div>
    </div>
  )
}
export default App