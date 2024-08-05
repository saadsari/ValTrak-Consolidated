import { Modal, Center } from '@mantine/core';

interface VideoModalProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, isOpen, onClose }: VideoModalProps) {
  //const theme = useMantineTheme();
  return (
    
    <Modal opened={isOpen} onClose={onClose} title="Lineup Clip" size="lg"
    styles={{
      content: {
        backgroundColor: '#1e2a38',
        color: 'white',
      },
      header: {backgroundColor:'#1e2a38'},
      title: {
        color: 'white',
        textAlign: 'center',
        width:'100%',
        paddingLeft:'15px'
      },
      body: {
        color: '#1e2a38',
      },
    }}>

{videoUrl ? (
        <Center>
         
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          title="Embedded Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe></Center>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
      
    </Modal>
  );
}
