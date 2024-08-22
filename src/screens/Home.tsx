import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
 import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { startOfDay } from "date-fns" 
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

// generate chartData between 7 days ago and 7 days from now per day
const today = new Date()
const startDate = new Date(today.setDate(today.getDate() - 7)) 
const chartDataArr : any = []
for (let i = 0; i < 8; i++) {

  const thisDate = new Date(startDate)
  thisDate.setDate(startDate.getDate() + i)
   

    if (startDate <= today ) {
      
      chartDataArr.push({
        titulo: 'Seminario' + Math.floor(Math.random() * 100),
        month: thisDate.toLocaleDateString('es-ES', {  year: 'numeric', month: 'short', day: 'numeric' }),
        presente_online: Math.floor(Math.random() * 5),
        presente_presencial: Math.floor(Math.random() * 5),
        ausente_online: Math.floor(Math.random() * 5),
        ausente_presencial: Math.floor(Math.random() * 5),
      }) 
      }
        
} 

const setFutureSeminars : any = []
for (let i = 0; i < 7; i++) {
  const thisDate = new Date(today)
  thisDate.setDate(today.getDate() + i)
  setFutureSeminars.push({
    titulo: 'Seminario' + Math.floor(Math.random() * 100),
    month: thisDate.toLocaleDateString('es-ES', {  year: 'numeric', month: 'short', day: 'numeric' }),
    day: thisDate.getDate(),
    capacidad: Math.floor(Math.random() * 100),
    preAsistencias: Math.floor(Math.random() * 100),
    lugar: 'Room' + Math.floor(Math.random() * 100),
  })
}

// next seminars are the seminar for next 7 days
const nextSeminars = chartDataArr.filter((seminar: { month: string | number | Date }) => {
  const today = new Date()
  const seminarDate = new Date(seminar.month)
  const nextDate = new Date(today.setDate(today.getDate() + 7))
  return seminarDate >= nextDate
})


function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Function to get seminar titles for a given date
  const getSeminarsForDate = (date: Date) => {
    const dateString = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    return chartDataArr.filter((seminar:any) => seminar.month === dateString)
  }

  return (
    <>
      <h3 className="text-center text-2xl font-bold w-full">
        Calendario de seminarios
      </h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md "
        // Custom day content
        renderDay={(day:any) => {
          const seminars = getSeminarsForDate(day)
          return (
            <div className="relative">
              <div>{day.getDate()}</div>
              {seminars.length > 0 && (
                <div className="absolute top-0 left-0 right-0 h-full w-full flex flex-col items-center justify-center">
                  {seminars.map((seminar:any) => (
                    <div key={seminar.titulo} className="text-xs">
                      {seminar.titulo}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        }}
      />
    </>
  )
}
const components: { title: string; }[] = [
  {
    title: "Usuarios activos",
  },
  {
    title: "Seminario Nuevo",
  },
  {
    title: "Prefil de Instructores"
  },
  {
    title: "Lista de Seminarios(legacy)",  
  },
  {
    title: "Lista de Instructores(legacy)",
  },
  {
    title: "Asistencias por Seminario(legacy)",
   },
  {
    title: "Lista de Personas(legacy)", 
  }, 

]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
   presente_online: {
    label: "Presente Online",
    color: "hsl(var(--chart-2))",
  },
   presente_presencial: {
    label: "Presente Presencial",
    color: "hsl(var(--chart-2))",
  },
   ausente_online: {
    label: "Ausente Online",
    color: "hsl(var(--chart-1))",
  },
   ausente_presencial: {
  label: "Ausente Presencial",
    color: "hsl(var(--chart-1))",
  },

} satisfies ChartConfig
function Component() {
  const thisWeek = new Date() 



  thisWeek.setDate(thisWeek.getDate() - 7)
  const startDate = thisWeek.toISOString().split('T')[0]
  // start date to human readable
  const startDateHuman = new Date(startDate).toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
  const endDate = new Date(thisWeek.setDate(thisWeek.getDate() + 7)).toISOString().split('T')[0]
  // end date to human readable
  const endDateHuman = new Date(endDate).toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seminarios atendidos esta semana</CardTitle>
        <CardDescription> 
          {startDateHuman} - {endDateHuman}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartDataArr}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
             <Bar dataKey="presente_online" fill="var(--color-presente_online)" radius={4} />
             <Bar dataKey="presente_presencial" fill="var(--color-presente_presencial)" radius={4} />
             <Bar dataKey="ausente_online" fill="var(--color-ausente_online)" radius={4} />
             <Bar dataKey="ausente_presencial" fill="var(--color-ausente_presencial)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"> 
        <div className="leading-none text-muted-foreground">
          Ultimos seminarios asistidos
        </div>
      </CardFooter>
    </Card>
  )
}
function NavigationMenuDemo(setMenu: any) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* iamge logo */}
          <NavigationMenuTrigger>  
               <img src="public\cropped-1000042563.png" alt="logo" className="w-full h-full" />
            
             
           
         
        </NavigationMenuTrigger>
          <NavigationMenuTrigger>Seminarios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {
                        nextSeminars.length > 0 ? (
                          'Seminarios Próximos: ' + chartDataArr.length 
                          
                        ):null
                      }
                    </div>
                    
                  </a>
                </NavigationMenuLink>
              </li>  
              <ListItem title="Lista de Seminarios">
                Seminarios para las próximas semanas
              </ListItem>
              <ListItem title="Historial">
               Observe su historial de asistencias  
              </ListItem>
              <ListItem title="Seminarios Ofrecidos">
               Observe los seminarios ofrecidos 
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      </NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Comandos de Admin</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title} 
                  onClick={() => setMenu(component.title)}
                  
                > 
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cuenta</NavigationMenuTrigger>
          <NavigationMenuContent>
           {/* ul li mostrando ajusted de cuenta */}
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem title="Perfil">
                Perfil
              </ListItem>
              <ListItem title="Notificaciones">
                Notificaciones
              </ListItem>
              <ListItem title="Cerrar Sesion">
                Cerrar Sesion
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenu>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
export default function Home() {


  const [menu, setMenu] = useState("proximosSeminarios")
  
  const professorData = {
    name: "Prof. John Doe",
    title: "Associate Professor",
    department: "Department of Computer Science",
    email: "johndoe@example.com",
    phone: "+1-234-567-890",
    seminarios:[
      {
        asistencias: 12,
        ausencias: 4,
      }
    ],
    sems: [
      { title: "Seminario 1", year: 2021, journal: "Profesor" },
      { title: "Seminario 2", year: 2020, journal: "Journal B" },
    ],
    publications: [
      { title: "Empleo 1", year: 2021, journal: "Profesor" },
      { title: "Empleo 2", year: 2020, journal: "Journal B" },
    ],
    achievements: [
      "Awarded Best Researcher 2020",
      "Grant Winner 2019",
    ],

  };
  const thisDate = new Date()
  const asistenciaSeminario = [
    {
      titulo: 'Seminario' + Math.floor(Math.random() * 100),
      month: thisDate.toLocaleDateString('es-ES', {  year: 'numeric', month: 'short', day: 'numeric' }),
      lugar: 'Room' + Math.floor(Math.random() * 100),
      // random boolean
      asistencias: Math.floor(Math.random() * 100),
    }
  ]

    return <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <NavigationMenuDemo setMenu={setMenu} /> 
    <div className="flex flex-col items-center justify-center w-full h-[10vh] bg-green-900"> 
  <h1 
  style={{
    fontFamily: 'Fjalla One',
     fontWeight: 400, 
     fontSize: '43px',
     color: 'white', 
  }} 
  >
  Puerto Rico Transportation Technology Transfer Center
  </h1>
      </div>
     
      {/* 2columns */}
      <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-max-[70vh] p-3 rounded-lg border "
    >
      <ResizablePanel  
        className="p-2"
      >
      <CalendarDemo />
      <Component />

      </ResizablePanel>
      
      <ResizablePanel defaultSize={80} >
      <Tabs defaultValue="nextSemi" className="w-full justify-center h-full">
  <TabsList>
    <TabsTrigger value="nextSemi">Proximos Seminarios</TabsTrigger>
    <TabsTrigger value="historial">Historial de Asistencias</TabsTrigger>
    <TabsTrigger value="datos">Datos Profesionales</TabsTrigger>
  </TabsList>
  <TabsContent value="nextSemi">

  <h2 className="text-center text-2xl font-bold w-full items-start justify-center">
        Proximos seminarios
       </h2>
    
    <ScrollArea className="w-full h-full overflow-y-auto"
      style={{ height: "calc(100vh - 100px)" }}
    >
    {
      setFutureSeminars.length > 0 ? setFutureSeminars.map((seminar, index) => (
        <div key={index} className="flex flex-col items-center justify-center w-full  h-full">
          <div className="flex flex-col items-center justify-center w-full  h-full">
            <Card className="w-full h-full m-2">
              <CardHeader>
                <CardTitle>Seminario {seminar.titulo}</CardTitle>
                <CardDescription> 
                  {seminar.month}
                  <br/>
                  {'Instructores - '}
                  <br/>
                  {'Capacidad Maxima '+ seminar.capacidad}
                </CardDescription>
              </CardHeader>
              <CardContent>
               
                <div className="flex flex-col items-center justify-center w-full  h-full ">
                   
                  <div className="flex flex-col items-end justify-center w-full  h-full ">
                  <div className="flex items-center space-x-2 space-y-2">
      <Checkbox id="terms2"  />
      <label 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Registro para seminario
      </label>
    </div>
      <div className="flex items-center space-x-2 space-y-2">
      <Checkbox id="terms2"  />
      <label 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Registro para notificaciones
      </label>
    </div>
    
                  </div>
                  </div>
                
                  </CardContent>
                  </Card>
          </div>
        </div>

      )) : 
       <div className="flex flex-col items-center justify-center w-full  h-full">
         <h2 className="text-center text-2xl font-bold">
          No hay seminarios para mostrar
         </h2> 
       </div>
    }
</ScrollArea>
  </TabsContent>
  <TabsContent value="historial">

  <h2 className="text-center text-2xl font-bold w-full items-start justify-center">
        Historial de Asistencias
       </h2>
    
    <ScrollArea className="w-full h-full overflow-y-auto"
      style={{ height: "calc(100vh - 100px)" }}
    >
    {
      asistenciaSeminario.length > 0 ? setFutureSeminars.map((seminar, index) => (
        <div key={index} className="flex flex-col items-center justify-center w-full  h-full">
          <div className="flex flex-col items-center justify-center w-full  h-full">
            <Card className="w-full h-full m-2">
              <CardHeader>
                <CardTitle>Seminario {seminar.titulo}</CardTitle>
                <CardDescription> 
                  {seminar.month}
                  <br/>
                  {'Instructores - '}
                  <br/>
                  <b>Asistido</b>
                </CardDescription>
              </CardHeader>
              <CardContent>
              
                
                  </CardContent>
                  </Card>
          </div>
        </div>

      )) : 
       <div className="flex flex-col items-center justify-center w-full  h-full">
         <h2 className="text-center text-2xl font-bold">
          No hay seminarios para mostrar
         </h2> 
       </div>
    }
</ScrollArea>
  </TabsContent>
  <TabsContent value="datos">
    
      <h2 className="text-center text-2xl font-bold w-full items-start justify-center">
       Datos Profesionales
       </h2>
       <Card className="w-full h-full m-2">
      <CardHeader>
        <CardTitle>{professorData.name}</CardTitle>
        <CardDescription>
          {professorData.title}, {professorData.department}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div>
            <strong>Email:</strong> {professorData.email}
          </div>
          <div>
            <strong>Phone:</strong> {professorData.phone}
          </div>
          <Separator />
          <div>
            <strong>Empleos: 
            </strong>
            <Accordion type="single" collapsible className="w-full">
              {professorData.publications.map((pub, index) => (
                <AccordionItem key={index} value={`pub-${index}`}>
                  <AccordionTrigger>{pub.title} ({pub.year})</AccordionTrigger>
                  <AccordionContent>
                    <p>{pub.journal}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
           </div>
           <Button className="mt-2">
              Añadir un nuevo Empleo 
              </Button>
           <Separator />
           <div>
            <strong>Seminarios Ofrecidos: 
            </strong>
            <Accordion type="single" collapsible className="w-full">
              {professorData.sems.map((pub, index) => (
                <AccordionItem key={index} value={`pub-${index}`}>
                  <AccordionTrigger>{pub.title} ({pub.year})</AccordionTrigger>
                  <AccordionContent>
                   </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
           </div>
           
          <Separator />
          <div>
          </div>
        </div>
      </CardContent>
    </Card>

  </TabsContent>
</Tabs>
    
       </ResizablePanel>
    </ResizablePanelGroup>
      

      {/* <PaginationDe1mo /> */}
      </div>
  }