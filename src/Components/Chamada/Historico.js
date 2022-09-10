import React, {useEffect, useState} from 'react'


const Historico = ({item}) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/chamada-em-andamento')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log('Catch: ', err))
    }, [])

    useEffect(() => {
        fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/contato/' + item.id)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setInfo(data)
        })
        .catch(err => console.log(err))
    }, [item.id])

    const infos = info.map((e) => {

        const formatar = (valor) => {
            let aux = valor.split('T')
            aux[0] = aux[0].split('-').reverse().join('/')
            aux[1] = aux[1].substring(0, 7)
            return aux.join(' ')
        }

        return (
            <ol key={item.id} className='flex flex-row justify-evenly border-b-2 border-slate-200 py-2 items-center bg-white  '>
                <li className='w-40'>{formatar(e.inicioAtendimento)}</li>
                <li className='w-40'>{e.fimAtendimento === null? 'Em andamento...': formatar(e.fimAtendimento)}</li>
                <li className='w-40 break-all'>{e.assunto}</li>
            </ol>
        )
    })

    return (
        <ol className='table w-full border-y-2 rounded-lg border-slate-200 '>
            <ol className='table-head border-b-2 border-slate-300'>
                <ol className='flex flex-row font-bold bg-slate-50 py-2 justify-evenly'>
                    <li className='w-40'>Inicio</li>
                    <li className='w-40'>Fim</li>
                    <li className='w-36'>Assunto</li>
                </ol>
            </ol>

            <ol>
                {infos}
            </ol>
        </ol>
    )
}

export default Historico