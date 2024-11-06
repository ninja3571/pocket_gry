'use client'

import Image from "next/image";
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import PocketBase from 'pocketbase';
import { Button } from "@/components/ui/button";

export default function Home() {
  const pb = new PocketBase('http://172.16.15.141:8080');
  // const pb = new PocketBase('http://192.168.60.16:8080');

  const [gry, setGry] = useState(null)
  const [zdjecie, setZdjecie] = useState(null)

  const zmienDost = (e) => {
    console.log(e)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb.collection('gry').getFullList({
          sort: '-created',
        })
        setGry(records)
        console.log(records)
      } catch (err) {
        console.log(err)
      } finally {

      }
    }
    getData()
  }, [])

  const createGame = ()=>{
    const dane = {}
  }

  return (
    <div className="w-full h-screen flex flex-row flex-wrap gap-4 mt-3 ml-3">
      {gry &&
        gry.map((item) => (
          <Card key={item.id} className='h-[500px] w-[350px] flex items-center flex-col'>
            <CardHeader>
              <CardTitle>{item.nazwa}</CardTitle>
              <CardDescription>{item.cena}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.opis}</p>
            </CardContent>
            <Image
                src={pb.files.getUrl(item, item.zdjecie)}
                alt={item.zdjecie}
                width={200}
                height={300} />
            <CardFooter>
              <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>EDIT</DropdownMenuItem>
                  <DropdownMenuItem>DELETE</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Switch
                checked={item.dostepnosc}
                onCheckedChange={(e) => zmienDost(item.zdjecie)}
              />

            </CardFooter>
          </Card>
        ))
      }
      <Card className='h-[500px] w-[350px] flex justify-center items-center relative'>
      <Sheet>
        <SheetTrigger className="scale-[5] font-bold">+</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>STWÓRZ NOWY ELEMENT</SheetTitle>
            <SheetDescription>
              Czy na pewno chcesz dodać nowy element?
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>

          <Dialog>
            <DialogTrigger>STWÓRZ</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
                <input placeholder="nazwa" id='nazwa'></input>
                <input placeholder="cena" id='cena'></input>
                <input placeholder="opis" id='opis'></input>
                <input placeholder="dotepnosc" id='dostepne'></input>
                <input type="file" id="zdjecie"></input>
                <Button onClick={createGame}>STWÓRZ</Button>
            </DialogContent>
          </Dialog>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      </Card>
      
    </div>
  );
}
