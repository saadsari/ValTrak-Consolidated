import '@mantine/core/styles.css';
import { Flex, Title} from '@mantine/core';
import LandingCard from "../ui/landingcard"
import { useNavigate } from 'react-router-dom';

interface LandingCardProps {
    img: string,
    title: string,
    description: string,
    alt: string,
    path: string
  }
  const cardObj1:{title: string, description: string, img: string, alt:string, path:string} ={
    title: "LINEUPS",
    description: "Quickly access popular lineup setups for your favorite utility driven agents!",
    img: "https://cdn.oneesports.gg/cdn-data/2021/08/Valorant_Viper_Ultimate_VipersPit_OneYearAnthem.jpg",
    alt: "LINEUPSalt", 
    path: "/lineupHub"  
  };
  const cardObj2:{title: string, description: string, img: string, alt:string, path:string} ={
    title: "PREDICT",
    description: "Harness historical match data to predict your current game match outcomes.",
    img: "https://www.gamespot.com/a/uploads/original/1594/15949828/3689802-valorant_icons_2.jpg",
    alt:  "PREDICTalt",
    path: "/predictHub" 
  };
  const cards: LandingCardProps[] = [cardObj1, cardObj2]
  export default function WelcomeCards() {
    const navigate = useNavigate();
    const handleClick = (path: string) => {
        navigate(path);
    };
    return (
    <>
    
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      <Title order={1} c='#EFEFEF' >Welcome!</Title>
      <Title order={4} c='#EFEFEF' >Please select which of the following ValTrak Modules you would like to use, some of these features are currently under construction :D</Title>
    </div>

    <Flex pt = '20'
            mih = '75vh'
            direction = 'row'
            gap = 'md'
            justify = 'center'
            align = 'center'
            >
        {cards.map((card, index) => (
        <LandingCard
            key={index}
            img={card.img}
            title={card.title}
            description={card.description}
            alt={card.alt}
            path={card.path}
            onClick={handleClick}
        />
        
        ))}

    </Flex>
    </>
    )
  }