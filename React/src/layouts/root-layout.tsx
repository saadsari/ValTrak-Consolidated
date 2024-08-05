import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AppShell, Group,Center} from '@mantine/core';
import ValTrakTitle from '../ui/headertitle';
//import { useDisclosure } from '@mantine/hooks';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();
  //const [opened, { toggle }] = useDisclosure();
  return (
    <MantineProvider withCssVariables>
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
     <AppShell
      header={{ height: 40 }}
      padding="md"
       
    >
      <AppShell.Header zIndex={2000} bg = "#0F1923" >
        <Group justify='space-between' h="100%" px="md">
          <ValTrakTitle/>
          <SignedIn><UserButton/></SignedIn>
        </Group>  
        
      </AppShell.Header>
      
      <AppShell.Main bg = "#0F1923">  
        <SignedOut>
          <Center pt = '100'>
            <SignIn/>
          </Center>
        </SignedOut>
      <SignedIn>
        <Outlet />
      </SignedIn>
      
      </AppShell.Main>
      
    </AppShell>
      
    </ClerkProvider>
    </MantineProvider>
  )
}