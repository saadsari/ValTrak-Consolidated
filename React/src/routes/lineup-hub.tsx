import { useState } from 'react';
import { Grid, Title, Button, Center } from '@mantine/core';
import MapSelect from "../ui/mapselect";
import AgentSelect from "../ui/agentselect";
import { useNavigate } from 'react-router-dom';
import HavenMap from '../ui/havenmap';
import AscentMap from '../ui/ascentmap';
import BindMap from '../ui/bindmap';

export default function LineupHub() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/submitHub');
  };

  const renderSelectedMap = () => {
    switch (selectedMap) {
      case 'haven':
        return <HavenMap selectedAgent={selectedAgent} />;
      case 'ascent':
        return <AscentMap selectedAgent={selectedAgent} />;
      case 'bind':
        return <BindMap selectedAgent={selectedAgent} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Grid style={{ marginBottom: '-175px' }}>
        <Grid.Col span={4}>
        <div style={{ color: '#0F1923' }}>
          <MapSelect onSelect={setSelectedMap} />
          </div>
        </Grid.Col>

        <Grid.Col span={4}>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <Title order={1} c='#EFEFEF'>LineupHub</Title>
            <Title order={5} c='#EFEFEF'>Please Select Map + Agent</Title>
          </div>
        </Grid.Col>

        <Grid.Col span={4} style={{ justifyContent: 'right' }}>
        <div style={{ color: '#0F1923' }}>
          <AgentSelect onSelect={setSelectedAgent} />
          </div>
        </Grid.Col>
      </Grid>

      <div style={{ zIndex: '0', display: 'flex', justifyContent: 'center', marginTop: '5px', borderRadius: '8px' }}>
        {selectedMap && selectedAgent ? (
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
            marginTop: "180px", marginBottom: '90px',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '20px',
          }}>
            <div style={{
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
                1. Agent Starting Position: <span style={{ color: 'green' }}>Green</span>
              </p>
              <p style={{ margin: 0 }}>
                2. Utility End Destination: <span style={{ color: 'red' }}>Red</span>
              </p>
              <p style={{ margin: 0 }}>
                3. Click a marker to view the setup!
              </p>
            </div>
          </div>
        )}
      </div>

      <Center style={{ marginTop: '20px' }}>
        <Button onClick={handleClick}>Submit Lineups</Button>
      </Center>
    </>
  );
}
