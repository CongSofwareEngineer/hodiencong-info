import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hồ Diên Công - Software Engineer',
    short_name: 'HoDienCong_SoftwareEngineer',
    description: 'Hồ Diên Công - Software Engineer',
    start_url: '/',
    display: 'fullscreen',
    background_color: '#fff',
    theme_color: '#fff',
    "icons": [
      {
        "src": "36x36.png",
        "sizes": "36x36",
        "type": "image/png",
      },
      {
        "src": "48x48.png",
        "sizes": "48x48",
        "type": "image/png",
      },
      {
        "src": "72x72.png",
        "sizes": "72x72",
        "type": "image/png",
      },
      {
        "src": "96x96.png",
        "sizes": "96x96",
        "type": "image/png",
      },
      {
        "src": "144x144.png",
        "sizes": "144x144",
        "type": "image/png",
      },
      {
        "src": "192x192.png",
        "sizes": "192x192",
        "type": "image/png",
      }
    ],
  }
}