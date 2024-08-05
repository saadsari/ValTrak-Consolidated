import { Card, Image, Text, Button, Group } from '@mantine/core';

interface LandingCardProps {
    img: string,
    title: string,
    description: string,
    alt: string,
    path: string,
    onClick: (path:string) => void
}
function LandingCard({img, title, description, alt, path, onClick}: LandingCardProps) {
    return (
      <Card bg = '#0F1923' shadow="sm" padding="lg" radius="md" withBorder style={{ width: 500, height: 375
       }}>
        <Card.Section>
          <Image
            src = {img}
            height = {200}
            alt= {alt}
          />
        </Card.Section>
  
        <Group justify="space-between" mt="md" mb="xs">
          <Text c = "white" fw={500}>{title}</Text>
        </Group>
  
        <Text size="sm" c="dimmed">
          {description}
        </Text>
  
        <Button color="red" fullWidth mt="md" radius="md" onClick={() => onClick(path)}>
          LETS GO!
        </Button>
      </Card>
    );
  }
 export default LandingCard;