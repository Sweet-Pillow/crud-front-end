import React, { useEffect, useState } from 'react'
import ModalForm from '../Modals/Modal'
import Swal from 'sweetalert2'


const DataTable = ({infoChamada, items, updateState, deleteItemFromState}) => {
  const [linhaEmChamada, setLinhaEmChamada] = useState({})

  // useEffect(() => {
  //   setLinhaEmChamada(infoChamada)
  //   console.log(linhaEmChamada)
  // }, [infoChamada, linhaEmChamada])

  const atualizarLinha = (e) => {
    setLinhaEmChamada(e)
    console.log(e)
    console.log(`Info Chamada: ${infoChamada.contatoId},Linha Cha: ${linhaEmChamada.contatoId}`)
  }

  const deleteItem = (item) => {
    Swal.fire({
      title: `Você apagará # ${item.id} ${item.nome}, tem certeza?`,
      text: "Essa ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + item.id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "id": item.id 
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(item.id)
          deleteItemFromState(item.id)
        })
        .catch(err => console.log(err))
        Swal.fire(
          'Deletado!',
          `# ${item.id} ${item.nome} foi deletado`,
          'success'
        )
      }
    })
  }

  const corpoTabela = items.map(item => {

    return (
      <ol key={item.id} className={'flex flex-row justify-evenly border-b-2 border-slate-200 py-2 items-center bg-white  '}>
        <li className='w-16 font-bold'>{item.id}</li>
        <li className='w-72 whitespace-normal text-gray-500'>{item.nome}</li>
        <li className='w-52 break-all text-gray-500'>{item.email}</li>
        <li className='w-36 text-gray-500'>{item.telefone}</li>
        <li className='w-20 text-gray-500'>{item.ativo? 'Ativo': 'Inativo'}</li>
        {/* <li className={'w-20 text-gray-800 rounded ' + (item.ativo? ' bg-green-400':'bg-red-00')}>{item.ativo? 'Ativo': 'Inativo'}</li> */}
        <li className='w-48 text-gray-500'>{item.dataNascimento.substring(0, 10).split('-').reverse().join('/')}</li>
        <li className='w-16'>

          <div className='group w-min rounded-full'>
             <span>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:bg-gray-600 rounded-full ease-liner duration-300 group-hover:bg-gray-600">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
               </svg>
             </span>
             <div className='group hidden fixed rounded z-20 p-1 group-hover:block bg-white border-2 border-gray-500'>
               <ol>
                <li>
                  <ModalForm buttonLabel="Editar" item={item} updateState={updateState} tipo="AddEdit"/>
                  {' '}
                </li>
                <li>
                  <button onClick={() => deleteItem(item)} type="button" className="p-1 w-full text-base hover:text-orange-600 ease-in duration-100 flex flex-row justify-start">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                   </svg>
                   <span>Deletar</span>
                  </button>
                </li>
                <li>
                  <ModalForm buttonLabel="Chamada" item={item} infoChamada={infoChamada} tipo='Chamada' />
                  {' '} 
                </li>
                <li>
                  <ModalForm buttonLabel="Historico" item={item} infoChamada={infoChamada} tipo='Historico'/>
                  {' '}
                </li>
               </ol>
             </div>
           </div>

        </li>
      </ol>
    )
  })

  return (
    <ol className='table w-full border-2 rounded-lg border-slate-200'>
      <ol className='table-head border-b-2 border-slate-300'>
        <ol className='flex flex-row font-bold bg-slate-50 py-2 justify-evenly'>
          <li className='w-16'>ID</li>
          <li className='w-72'>Nome</li>
          <li className='w-52'>Email</li>
          <li className='w-36'>Telefone</li>
          <li className='w-20'>Status</li>
          <li className='w-48'>Data de nascimento</li>
          <li className='w-16'>Ações</li>
        </ol>
      </ol>

      <ol className='table-body'>
        {corpoTabela}
      </ol>
    </ol>
  )
}

export default DataTable