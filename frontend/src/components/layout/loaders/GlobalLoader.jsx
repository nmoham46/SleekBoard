import ClassicLoader from "@/components/common/loaders/ClassicLoader"
import { useLoader } from "@/context/LoaderContext"

const GlobalLoader = () => {
  const { isGlobalLoading } = useLoader()

  return (
    <div>
      {isGlobalLoading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 flex justify-center items-center z-[99999]">
          <ClassicLoader />
        </div>
      )}
    </div>
  )
}

export default GlobalLoader