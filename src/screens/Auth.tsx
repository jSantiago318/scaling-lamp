import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { signIn, signUp } from '../../supabaseClient'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useState } from 'react'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <div className="flex flex-col items-center justify-center w-full h-screen bg-white"> 

 
  <div className="flex flex-col items-center justify-center w-full h-[10vh] mb-4 bg-green-900"> 
<h1 
style={{
  fontFamily: 'Fjalla One',
   fontWeight: 400, 
   fontSize: '43px',
   color: 'white',

}}
  // font family fjalla One
      // font size 20px
      // font weight bold
      
>
Puerto Rico Transportation Technology Transfer Center
</h1>
    </div>
    <Tabs defaultValue="signUp" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signUp">Cuenta Nueva</TabsTrigger>
        <TabsTrigger value="signin">Cuenta Existente</TabsTrigger>
      </TabsList>
      <TabsContent value="signUp">
        <Card>
          <CardHeader>
            <CardTitle>Cuenta Nueva</CardTitle>
            <CardDescription>
              Si ya ha tomado seminarios en el Centro de T2 puede ingresar con su correo y contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Correo</Label>
              <Input type="email" placeholder="Email"  
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="password" type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
            onClick={() => signUp(email, password)}
                className='bg-green-900'
            >Continuar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Cuenta Existente</CardTitle>
            <CardDescription>
            Si ya ha tomado seminarios en el Centro de T2 puede ingresar con su correo y contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Correo</Label>
              <Input type="email" placeholder="Email"  
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="password" type="password" 
              
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
            onClick={() => signIn(email, password)}
                className='bg-green-900'
            >Continuar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>;
}