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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import PocketBase from 'pocketbase';

export default function Home() {
  // const pb = new PocketBase('http://172.16.15.141:8080');
  const pb = new PocketBase('http://192.168.60.16:8080');

  const [dane, setDane] = useState(null)
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
        setDane(records)
        console.log(records)
      } catch (err) {
        console.log(err)
      } finally {

      }
    }
    getData()
  }, [])
  return (
    <div className="w-full h-screen flex flex-row flex-wrap">
      {dane &&
        dane.map((item) => (
          <Card>
            <CardHeader>
              <CardTitle>{item.nazwa}</CardTitle>
              <CardDescription>{item.cena}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{dane[1].opis}</p>
            </CardContent>
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
              <Image
                src={pb.files.getUrl(item, item.zdjecie)}
                alt={item.zdjecie}
                width={200}
                height={300} />
            </CardFooter>
          </Card>
        ))
      }
    </div>
  );
}
