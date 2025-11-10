// Dummy data de fotos
export const photos = [
  {
    id: 1,
    title: 'Mountain Sunset',
    url: 'https://picsum.photos/id/1018/800/600'
  },
  {
    id: 2,
    title: 'Ocean Waves',
    url: 'https://picsum.photos/id/1015/800/600'
  },
  {
    id: 3,
    title: 'Forest Path',
    url: 'https://picsum.photos/id/1019/800/600'
  },
  {
    id: 4,
    title: 'City Lights',
    url: 'https://picsum.photos/id/1022/800/600'
  },
  {
    id: 5,
    title: 'Desert Landscape',
    url: 'https://picsum.photos/id/1024/800/600'
  },
  {
    id: 6,
    title: 'Snowy Mountains',
    url: 'https://picsum.photos/id/1036/800/600'
  }
]

// Helper para encontrar foto por ID
export function getPhotoById(id) {
  return photos.find(photo => photo.id === Number(id))
}

// Helper para encontrar o index da foto
export function getPhotoIndex(id) {
  return photos.findIndex(photo => photo.id === Number(id))
}

// Helper para obter foto anterior
export function getPreviousPhoto(currentId) {
  const currentIndex = getPhotoIndex(currentId)
  if (currentIndex <= 0) return null
  return photos[currentIndex - 1]
}

// Helper para obter próxima foto
export function getNextPhoto(currentId) {
  const currentIndex = getPhotoIndex(currentId)
  if (currentIndex === -1 || currentIndex >= photos.length - 1) return null
  return photos[currentIndex + 1]
}

// Helper para obter foto aleatória (diferente da atual)
export function getRandomPhoto(currentId) {
  const availablePhotos = photos.filter(photo => photo.id !== Number(currentId))
  const randomIndex = Math.floor(Math.random() * availablePhotos.length)
  return availablePhotos[randomIndex]
}