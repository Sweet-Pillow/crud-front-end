import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask'


const AddEditForm = ({item, updateState, toggle, addItemToState}) => {
  const [state, setState] = useState(
    {
    nome: '',
    email: '',
    telefone: '',
    ativo: true,
    dataNascimento: ''
  })

  useEffect(() => {
    if(item){
      const { id, nome, email, telefone, ativo, dataNascimento } = item
      setState({ id, nome, email, telefone, ativo, dataNascimento })
  }}, [])

  const handleChange = (e) => {
    if (e.target.name === 'ativo'){
      return setState({...state, [e.target.name]: e.target.checked})
    }
    return setState({...state, [e.target.name]: e.target.value})
  }
  
  const submitFormAdd = e => {
    e.preventDefault()

    fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "nome": state.nome,
        "telefone": state.telefone,
        "email": state.email,
        "ativo": state.ativo,
        "dataNascimento": state.dataNascimento
      })
    })
      .then(response => response.json())
      .then(item => {
        addItemToState(item)
        toggle()
      })
      .catch(err => console.log(err))
  } 

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + state.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: state.nome,
        email: state.email,
        telefone: state.telefone,
        ativo: state.ativo,
        dataNascimento: state.dataNascimento
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log(item)
        updateState(item)
        toggle()
      })
      .catch(err => console.log(err))
  }


  return (
    <form>
      <div className="relative z-0 mb-3 w-full group">
        <label htmlFor="nome" className='block mb-2 text-sm text-gray-700'>Nome</label>
        <input type="text" name="nome" id="nome" onChange={handleChange} value={state.nome || ''} className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 '/>
      </div>
      <div className="relative z-0 mb-3 w-full group">
        <label htmlFor="email" className='block mb-2 text-sm text-gray-700'>Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} value={state.email || ''} className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 '/>
      </div>
      <div className="relative z-0 mb-3 w-full group">
        <label htmlFor="telefone" className='block mb-2 text-sm text-gray-700'>Telefone</label>
        <InputMask mask="(99)99999-9999" type="text" name="telefone" id="telefone" onChange={handleChange} value={state.telefone || ""}  placeholder="ex. (00)00000-0000" className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 '/>
      </div>
      <div className='mb-3'>
        <label htmlFor="ativo" className="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" name='ativo' id="ativo" className="sr-only peer" onChange={handleChange} checked={state.ativo} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm text-gray-700">Ativo</span>
        </label>
      </div>
      <div className="relative z-0 mb-3 w-full group">
        <label htmlFor="dataNascimento" className='block mb-2 text-sm text-gray-700'>Data de nascimento</label>
        <input type="date" name="dataNascimento" id="dataNascimento" onChange={handleChange} value={state.dataNascimento === null? '' :state.dataNascimento.substring(0, 10)} className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 ' />
      </div>
      <button type='submit' onClick={item ? submitFormEdit : submitFormAdd} className='text-white bg-blue-700 hover:bg-blue-800 rounded-md p-2 px-6'>Enviar</button>
    </form>
  )
}

export default AddEditForm