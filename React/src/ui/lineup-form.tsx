import { useForm } from '@mantine/form';
import { Text, TextInput, Button, Grid, Box, Center, Notification } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapSelect from '../ui/mapselect';
import AgentSelect from '../ui/agentselect';
import HavenMapForm from './havenmap-form';
import AscentMapForm from './ascentmap-form';
import BindMapForm from './bindmap-form';

export default function LineupForm() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [greenMarker, setGreenMarker] = useState<[number, number] | null>(null);
  const [redMarker, setRedMarker] = useState<[number, number] | null>(null);
  const [success, setSuccess] = useState(false);
  const [instructions, setInstructions] = useState<string>('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      map: '',
      agent: '',
      description: '',
      youtubeLink: '',
      greenMarker: null as [number, number] | null,
      redMarker: null as [number, number] | null,
    },
    validate: {
      map: (value) => (!!value ? null : 'Map Selection is Required.'),
      agent: (value) => (!!value ? null : 'Agent Selection is Required.'),
      youtubeLink: (value) => {
        const src = extractYouTubeEmbedLink(value);
        return src ? null : 'Invalid YouTube embed link';
      },
      greenMarker: () => (greenMarker ? null : 'Green Marker is required.'),
      redMarker: () => (redMarker ? null : 'Red Marker is required.'),
    },
  });

  const extractYouTubeEmbedLink = (iframe: string) => {
    const regex = /src="(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+(?:\?.*?)?)"/;
    const match = iframe.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (values: typeof form.values) => {
    const youtubeEmbedLink = extractYouTubeEmbedLink(values.youtubeLink);
    const updatedValues = { ...values, youtubeLink: youtubeEmbedLink };

    console.log('Form values:', updatedValues);
    console.log('Green Marker:', greenMarker);
    console.log('Red Marker:', redMarker);
    console.log('YouTube Embed Link:', youtubeEmbedLink);
    console.log('Selected Agent:', selectedAgent);  

    try {
      const response = await fetch('http://3.15.142.101:5000/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedValues,
          greenMarker,
          redMarker,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state or notification
    }
  };

  const updateFormMarkers = (green: [number, number] | null, red: [number, number] | null) => {
    form.setFieldValue('greenMarker', green);
    form.setFieldValue('redMarker', red);
  };

  const renderSelectedMap = () => {
    switch (selectedMap) {
      case 'haven':
        return <HavenMapForm greenMarker={greenMarker} setGreenMarker={setGreenMarker} redMarker={redMarker} setRedMarker={setRedMarker} updateFormMarkers={updateFormMarkers} />;
      case 'ascent':
        return <AscentMapForm greenMarker={greenMarker} setGreenMarker={setGreenMarker} redMarker={redMarker} setRedMarker={setRedMarker} updateFormMarkers={updateFormMarkers} />;
      case 'bind':
        return <BindMapForm greenMarker={greenMarker} setGreenMarker={setGreenMarker} redMarker={redMarker} setRedMarker={setRedMarker} updateFormMarkers={updateFormMarkers} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedMap) {
      if (greenMarker && !redMarker) {
        setInstructions('Please mark the utility destination on the map.');
      } else if (!greenMarker) {
        setInstructions("Please click on the map to mark the agent's position.");
      } else {
        setInstructions('');
      }
    } else {
      setInstructions('');
    }
  }, [selectedMap, greenMarker, redMarker]);

  return (
    <Box bg="#0F1923" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
      {success && (
        <div style={{
          position: 'absolute',
          top: 55,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
          <Notification title="Success" color="green" onClose={() => setSuccess(false)}>
            Lineup submitted successfully! Redirecting to the welcome page...
          </Notification>
        </div>
      )}
      <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))} style={{ padding: '20px', color: 'white' }}>
        <Grid>
          <Grid.Col span={6}>
            <MapSelect onSelect={(value) => {
              setSelectedMap(value);
              form.setFieldValue('map', value || '');
              setGreenMarker(null);
              setRedMarker(null);
            }} />
          </Grid.Col>
          <Grid.Col span={6}>
            <AgentSelect onSelect={(value) => {
              setSelectedAgent(value);
              form.setFieldValue('agent', value || '');
            }} />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label='Description'
              placeholder='Describe your lineup!'
              key={form.key('description')}
              {...form.getInputProps('description')}
              styles={{ label: { color: 'white' } }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label='YT Link'
              placeholder='Please paste a timestamped YouTube embed code!'
              key={form.key('youtubeLink')}
              {...form.getInputProps('youtubeLink')}
              styles={{ label: { color: 'white' } }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Grid.Col>
        </Grid>
        <Box mt="20px" style={{ color: 'white' }}>
          {instructions && (
            <div style={{
              backgroundColor: '#1e2a38',
              border: '2px #ffffff',
              borderRadius: '8px',
              borderColor: 'grey',
              padding: '10px',
              textAlign: 'center',
            }}>
              <Text>{instructions}</Text>
            </div>
          )}
        </Box>
      </Box>
      <Box mt="20px" p="20px">
        {selectedMap ? (
          renderSelectedMap()
        ) : (
          <div style={{
            color: 'white',
            backgroundColor: '#1e2a38',
            border: '2px dashed #ffffff',
            borderRadius: '8px',
            borderColor: 'grey',
            height: '700px',
            width: '700px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '20px',
          }}>
            <Text style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '1.5',
              zIndex: 1,
            }}>
              <p style={{ margin: 0 }}>
                1. First click will <span style={{ color: 'green' }}>mark</span> Agent Position
              </p>
              <p style={{ margin: 0 }}>
                2. Second click will <span style={{ color: 'red' }}>mark</span> Utility Destination
              </p>
            </Text>
          </div>
        )}
      </Box>
    </Box>
  );
}
