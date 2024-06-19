import { Helmet } from 'react-helmet-async'
import { MapPreview } from './utils/map-preview'

export function Map() {
  return (
    <>
      <Helmet title="Mapa interativo" />
      <div className="mb-4 flex items-center justify-between gap-8">
        <h1 className="text-3xl font-bold tracking-tighter">Mapa interativo</h1>
      </div>
      <MapPreview />
    </>
  )
}
