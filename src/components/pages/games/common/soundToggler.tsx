import { triggerSound } from '@/store/slices/configs/configs.slice'
import { useDispatch, useSelector } from '@/store/store'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid'

export const SoundTogglerButton = ({ disabled = false }: { disabled?: boolean }) => {
  const dispatch = useDispatch()
  const { configs } = useSelector((state) => state.configs)

  return (
    <button disabled={disabled} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition" onClick={() => dispatch(triggerSound())} aria-label="Toggle sound">
      {configs.sound ? <SpeakerWaveIcon className="w-6 h-6 text-white" /> : <SpeakerXMarkIcon className="w-6 h-6 text-white" />}
    </button>
  )
}
