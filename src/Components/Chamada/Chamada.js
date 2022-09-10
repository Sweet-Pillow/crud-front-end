import React, {useEffect, useState} from 'react'


const Chamada = ({updateBotao, item, toggle, }) => {
    const [tempo, setTempo] = useState([0, 0, 0])
    const [assunto, setAssunto] = useState('')
    const [infoChamada, setInfoChamada] = useState({})

    const handleChange = e => {
        setAssunto(e.target.value)
    }

    const verificarChamada = async () => {
        await fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/chamada-em-andamento')
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            setInfoChamada(data)
            ajustarTempo(data)
            console.log(data)
        })
        .catch(err => console.log('Catch: ', err))
    }

    const iniciarChamada = () => {
        if (Object.values(infoChamada).length === 0) {
            fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                "idContato": item.id,
                })
            })
            .then(resp => resp.json())
            .then(data => {
                updateBotao(true)
                setInfoChamada(data)
                console.log(data)})
            .catch(err => console.log(err))}
        }

    const encerrarChamada = (e) => {
        e.preventDefault()
        updateBotao(false)
        fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + infoChamada.id, 
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            "assunto": assunto,
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            toggle()})
        .catch(err => console.log(err))
    }

    const telaChamada = () => {
        return (
            <div className='block mb-2 text-base text-gray-800'>
                <p>Ligação para #{item.id} {item.nome}</p>
                <p>Duração: {tempo.map(t => t.toString().padStart(2, '0')).join(':')} .</p>         
                
                <form>
                    <div className='my-3'>
                        <label htmlFor="assunto" className='block mb-2 text-sm text-gray-700'>Assunto: </label>
                        <textarea id="assunto" name="assunto" onChange={handleChange} className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 ' required></textarea>
                    </div>
                    <button type='submit' onClick={encerrarChamada} className='text-white bg-blue-700 hover:bg-blue-800 rounded-md p-2 px-6'>Finalizar</button>
                </form>
            </div>
        )
    }

    const ligacaoParaOutroContato = () => {
        return (
            <div className='block mb-2 text-base text-gray-800'>
                <span>Encerre a ligação com #{infoChamada.contato.id} {infoChamada.contato.nome} para iniciar uma nova chamada.</span>
            </div>
        )
    }

    const ajustarTempo = (data) => {
        if (Object.values(data).length !== 0){
            const inicio = new Date(data.inicioAtendimento)
            const fim = new Date()
            const diferenca = new Date( fim - inicio )

            const hora = Number(diferenca.getUTCHours())
            const minuto = Number(diferenca.getUTCMinutes())
            const segundo = Number(diferenca.getUTCSeconds())

            setTempo([hora, minuto, segundo])

            console.log(tempo)
        }
    }

    useEffect(() => {
        verificarChamada()
        iniciarChamada()
    }, [])

    useEffect(() => {
       
        const interval = setInterval(() => {
            let hora = tempo[0]
            let minuto = tempo[1]
            let segundo = tempo[2]
    
            segundo += 1
            
            if (segundo === 60){
                segundo = 0
                minuto += 1
            }
            if (minuto === 60){
                minuto = 0
                hora += 1
            }
            setTempo([hora, minuto, segundo])
        }, 1000);

        return () => clearInterval(interval);
    
    }, [tempo])
    
    return (
        <>
        {/* {infoChamada.contatoId === item.id? (infoChamada? telaChamada(): (statusChamada? telaInicio(): telaChamada())) : ligacaoParaOutroContato()} */}
        {Object.values(infoChamada).length === 0? telaChamada(): infoChamada.contatoId !== item.id? ligacaoParaOutroContato(): telaChamada()}
        </>
    )
}

export default Chamada