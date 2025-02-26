import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'


function App() {

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'ben10@aliensquad.com',
    'elsa@arendelle.com',
  ])


  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }


  function closeGuestInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function addNewEmailToInvite (event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    //validação para não convidar 2 emails iguais
      if (emailsToInvite.includes(email)) {
        return
      }

    setEmailsToInvite([
      ...emailsToInvite,
    email
    ])
    
    event.currentTarget.reset()
  }

  function removeEmailFromInviteList(emailToRemove: string){

    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="h-screen flex items-center justify-center my-custom-bg" >
      <div className="max-w-3xl px-6 text-center space-y-6">

        <div className='flex flex-col items-center justify-center gap-3'>
          <img src="/logo.svg" alt="Logo Plann.er" />
          <p className="text-zinc-300">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center box-shadow-custom">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 text-zinc-400 outline-none flex-1" />
            </div>

            <div className=' flex items-center gap-2 '>
              <Calendar className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-zinc-400 text-lg placeholder-zinc-400 w-18 outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800 m-6'></div>

            {isGuestsInputOpen ? (

              <button onClick={closeGuestInput} className='bg-zinc-800 text-zinc-250 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700 cursor-pointer'>
                <Settings2 className='size-5' />
                Alterar Local e Data
              </button>

            ) : (

              <button onClick={openGuestsInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer'>
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (

            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center box-shadow-custom">

              <button onClick={openGuestsModal} type="button" className='flex items-center gap-2 flex-1 '>
                <UserRoundPlus className='size-5 text-zinc-400' />
                <span className='text-zinc-400 text-lg text-left cursor-pointer'>Quem estará na viagem?</span>
              </button>

              <div className='w-px h-6 bg-zinc-800 m-6'></div>

              <button className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer'>
                Confirmar Viagem
                <ArrowRight className='size-5' />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.</p>

      </div>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 box-shadow-custom bg-zinc-900 space-y-5">

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='font-bold text-zinc-300'>Selecionar convidados</h2>

                <button type='button' onClick={closeGuestsModal}>
                  <X className="size-5 text-zinc-400 cursor-pointer" />
                </button>
              </div>

              <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

            <div className='flex flex-wrap gap-2'>

              {emailsToInvite.map(email => {
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                    <span className='text-zinc-300'>{email}</span>
                    <button type='button' onClick={() => removeEmailFromInviteList(email)}>
                      <X className="size-4 text-zinc-400 cursor-pointer" />
                    </button>
                  </div>
                )
              })}
              </div>

              <div className="w-full h-px bg-zinc-800" />

              <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">

                <div className='px-2 flex items-center flex-1 gap-2'>
                  <AtSign className='size-5 text-zinc-400' />
                  <input 
                  type="email" 
                  name='email' 
                  placeholder='Digite o email do convidado' 
                  className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' 
                  />
                </div>

                <button type='submit' className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer'>
                  Convidar
                  <Plus className='size-5' />
                </button>

              </form>

            
          </div>
        </div>
      )}
    </div>
  )
}

export default App
