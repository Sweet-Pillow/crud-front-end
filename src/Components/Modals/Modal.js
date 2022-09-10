import React, { useEffect, useState } from 'react'
import AddEditForm from '../Forms/FormAddEdit'
import ChamadaForm from '../Chamada/Chamada'
import HistoricoChamada from '../Chamada/Historico'


const ModalForm = ({infoChamada, item, updateState, addItemToState, tipo, buttonLabel}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [botao, setBotao] = useState()

  const toggle = () => {
    setModalVisible(prevState => !prevState)
  }

  const updateBotao = (e) => {
    if (e){
      setTitulo('Encerrar')
      setBotao(<button onClick={toggle} className="p-1 w-full text-base hover:text-red-600 ease-in duration-100 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                </svg>
                <span>Encerrar</span>
              </button>)
    } else {
      setTitulo('Chamada')
      setBotao(<button onClick={toggle} className="p-1 w-full text-base hover:text-blue-600 ease-in duration-100 flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>Chamar</span>
              </button>)
    }
  }

  const closeBtn = <button className="close text-base hover:text-orange-600 ease-in duration-100" onClick={toggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

  // let type = tipo

  useEffect(() => {
    if(buttonLabel === 'Editar'){
      setBotao(<button onClick={toggle} className="p-1 w-full text-base hover:text-blue-600 ease-in duration-100 flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span>Editar</span>
                </button>)
      setTitulo('Editar contato')
    } else if(buttonLabel === 'Cadastrar') {
      setBotao(<button onClick={toggle} className='bg-green-600 p-2 px-4 rounded-md  text-white hover:bg-green-900 ease-in duration-500'>
                  {buttonLabel}
                </button>)
      setTitulo('Adicionar novo contato')
  } else if(buttonLabel === 'Chamada') {
      setTitulo('Chamada')

      if (infoChamada.contatoId === item.id){
        setBotao(<button onClick={toggle} className="p-1 w-full text-base hover:text-red-600 ease-in duration-100 flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                  </svg>
                  <span>Encerrar</span>
                </button>)
        
      } else {
        setBotao(<button onClick={toggle} className="p-1 w-full text-base hover:text-blue-600 ease-in duration-100 flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>Chamar</span>
                </button>)
      }

  } else if(buttonLabel === 'Historico') {
    setTitulo(`Historico  #${item.id} ${item.nome}`)
    setBotao(<button onClick={toggle} className="p-1 w-full text-base hover:text-blue-600 ease-in duration-100 flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span>Histórico</span>
            </button>)
  }
  }, [])

  
  const AddEdit = () => {
    return (
      <AddEditForm
          addItemToState={addItemToState}
          updateState={updateState}
          toggle={toggle}
          item={item} />
    )
  }

  const Chamada = () => {
    return (
      <ChamadaForm
        updateBotao={updateBotao}
        item={item}
        toggle={toggle}
        />
    )
  }

  const Historico = () => {
    return (
      <HistoricoChamada
        item={item}
      />
    )
  }
  
  const modal = () => {
    return (
      // {Modal Main}
      <div className='fixed w-full h-screen z-10 top-0 left-0 bg-gray-900/70 flex justify-center p-3 backdrop-blur-sm'>
        {/* Modal Content */}
        <div className='bg-white w-2/5 h-max max-h-full p-5 rounded overflow-auto'>
          {/* Modal Header */}
          <div className='flex justify-between border-b-2 border-zinc-700 mb-3 whitespace-pre-line'>
            <h1 className='text-4xl pb-1'>{titulo}</h1>
            {closeBtn}
          </div>
          {/* Modal body */}
          <div className=''>
            {tipo === 'AddEdit'? AddEdit(): tipo === 'Chamada'? Chamada(): Historico()}
          </div>
        </div>
      </div>
      )
  }

  return (
    <div>
      {botao}
      <div>
        {modalVisible? modal(): null}
      </div>
    </div>
  )
}

export default ModalForm
