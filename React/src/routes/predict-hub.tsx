import { Box, Button, NumberInput, Select, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export default function PredictionForm() {
  const theme = useMantineTheme();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState('');

  // Initialize the form with useForm
  const form = useForm({
    initialValues: {
      startingSide: '',
      teamAKD: undefined,
      teamAACS: undefined,
      teamBKD: undefined,
      teamBACS: undefined,
      prediction: '', // Add prediction field
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const payload = {
      starting_side: values.startingSide,
      teamA_avg_acs: values.teamAACS,
      teamA_avg_kdr: values.teamAKD,
      teamB_avg_acs: values.teamBACS,
      teamB_avg_kdr: values.teamBKD
    };

    console.log('Payload:', payload); // Log the payload to the console

    // Show disclaimer
    setShowDisclaimer(true);
    setConfidenceRating('');

    try {
      const response = await fetch('http://3.15.142.101:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log('API Response:', data); // Log the API response to the console

      form.setFieldValue('prediction', data.prediction);

      // Set confidence rating after 5 seconds
      setTimeout(() => {
        setShowDisclaimer(false);
        setConfidenceRating(
          `Confidence Rating: ${
            data.prediction === 'win' ? '<span style="color: green;">Win</span>' : '<span style="color: red;">Loss</span>'
          }`
        );
      }, 5000);
    } catch (error) {
      console.error('Error making prediction:', error);
      setShowDisclaimer(false);
    }
  };

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}
      >
        <Select
          label="Starting Side"
          placeholder="What side are you starting?"
          {...form.getInputProps('startingSide')}
          data={['Attack', 'Defense']}
          required
          styles={{
            label: { color: 'white' },
          }}
        />
        <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <NumberInput
              label="Team A KD"
              {...form.getInputProps('teamAKD')}
              placeholder="Enter Team A KD here"
              required
              styles={{
                label: { color: 'white' },
              }}
            />
            <NumberInput
              label="Team A Avg ACS 0-700"
              {...form.getInputProps('teamAACS')}
              placeholder="Enter Team A ACS here"
              required
              step={1}
              max={700}
              styles={{
                label: { color: 'white' },
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <NumberInput
              label="Team B KD"
              {...form.getInputProps('teamBKD')}
              placeholder="Enter Team B KD here"
              required
              styles={{
                label: { color: 'white' },
              }}
            />
            <NumberInput
              label="Team B Avg ACS 0-700"
              {...form.getInputProps('teamBACS')}
              placeholder="Enter Team B ACS here"
              required
              step={1}
              max={700}
              styles={{
                label: { color: 'white' },
              }}
            />
          </div>
        </div>
        <Button type="submit">Predict</Button>
      </form>
      {(showDisclaimer || confidenceRating) && (
        <Box
          style={{
            backgroundColor: '#1e2a38',
            color: 'white',
            padding: theme.spacing.md,
            marginTop: theme.spacing.md,
          }}
        >
          {showDisclaimer && <Box>Comparing statistics with historical game data...</Box>}
          {confidenceRating && <Box dangerouslySetInnerHTML={{ __html: confidenceRating }} />}
        </Box>
      )}
    </Box>
  );
}
