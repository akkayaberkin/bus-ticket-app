import { useState } from 'react'
import { GoogleAddressSearch } from 'react-google-address-search'
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel,
  Button,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Drawer
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { PlusCircle, MapPin, X, Edit2, Trash2 } from 'lucide-react'
import './App.css'

const steps = ['Konum Seçimi', 'Kişisel Bilgiler', 'Ödeme']

interface AddressOption {
  description: string;
  placeId: string;
  title?: string;
  note?: string;
}

function App() {
  const [selectedAddress, setSelectedAddress] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<AddressOption | null>(null)
  const [addressTitle, setAddressTitle] = useState('')
  const [addressNote, setAddressNote] = useState('')

  const handleAddressSelect = (address: string) => {
    const newOption = {
      description: address,
      placeId: Date.now().toString()
    }
    setSelectedOption(newOption)
    setAddressTitle('')
    setAddressNote('')
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedOption(null)
    setAddressTitle('')
    setAddressNote('')
  }

  const handleAddressConfirm = () => {
    if (selectedOption) {
      const fullAddress = {
        ...selectedOption,
        title: addressTitle,
        note: addressNote
      }
      setSelectedAddress(fullAddress.description)
      setIsDrawerOpen(false)
      setSelectedOption(null)
      setAddressTitle('')
      setAddressNote('')
      console.log('Kaydedilen adres:', fullAddress)
    }
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleAddAddress = () => {
    console.log('Yeni adres ekle')
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Bilet Rezervasyonu
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Teslimat Adresi
              </Typography>
              <Tooltip title="Yeni Adres Ekle">
                <IconButton 
                  color="primary" 
                  onClick={handleAddAddress}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(25, 118, 210, 0.04)' 
                    } 
                  }}
                >
                  <PlusCircle size={24} />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1">
                  Adresinizi Seçin
                </Typography>
              </Box>
              
              <Box sx={{ position: 'relative' }}>
                <GoogleAddressSearch
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  onSelect={handleAddressSelect}
                  placeholder="Adres aramak için yazın..."
                />
              </Box>
            </Paper>

            {selectedAddress && (
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  mb: 3,
                  bgcolor: '#f8f9fa',
                  borderColor: 'primary.main',
                  borderWidth: '2px'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                    <MapPin 
                      size={24} 
                      style={{ 
                        color: '#1976d2',
                        marginRight: '12px',
                        marginTop: '2px'
                      }} 
                    />
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'primary.main',
                          mb: 0.5 
                        }}
                      >
                        Teslimat Adresi
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.primary',
                          lineHeight: 1.5 
                        }}
                      >
                        {selectedAddress}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Düzenle">
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': { backgroundColor: 'primary.light' }
                        }}
                      >
                        <Edit2 size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: 'error.main',
                          '&:hover': { backgroundColor: 'error.light' }
                        }}
                        onClick={() => setSelectedAddress('')}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            )}
          </Box>
        )}

        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ad"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soyad"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-posta"
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefon"
                variant="outlined"
              />
            </Grid>
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Geri
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 0 && !selectedAddress}
          >
            {activeStep === steps.length - 1 ? 'Tamamla' : 'İleri'}
          </Button>
        </Box>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: '400px',
              p: 3,
              boxSizing: 'border-box'
            }
          }}
        >
          <Box sx={{ position: 'relative', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Adres Detayı</Typography>
              <IconButton onClick={handleDrawerClose} size="small">
                <X size={20} />
              </IconButton>
            </Box>

            {selectedOption && (
              <Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <MapPin size={24} style={{ color: '#1976d2' }} />
                  <Typography>{selectedOption.description}</Typography>
                </Box>

                <TextField
                  fullWidth
                  label="Adres Başlığı"
                  variant="outlined"
                  placeholder="Örn: Ev, İş"
                  value={addressTitle}
                  onChange={(e) => setAddressTitle(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Adres Notu"
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Varsa adres notunuzu ekleyin"
                  value={addressNote}
                  onChange={(e) => setAddressNote(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Box>
            )}

            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddressConfirm}
                size="large"
              >
                Adresi Kaydet
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Paper>
    </Container>
  )
}

export default App
