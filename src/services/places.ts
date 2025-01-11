declare global {
  interface Window {
    google: any;
  }
}

const loadScript = (src: string, position: HTMLElement | null, id: string) => {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
};

export const loadGoogleMapsScript = () => {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
  loadScript(src, document.querySelector('head'), 'google-maps');
};

export const getPlacePredictions = async (input: string) => {
  if (!window.google) return [];

  const service = new window.google.maps.places.AutocompleteService();
  const request = {
    input,
    componentRestrictions: { country: 'tr' }, // Türkiye ile sınırla
    types: ['address']
  };

  try {
    const response = await service.getPlacePredictions(request);
    return response.predictions;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return [];
  }
}; 