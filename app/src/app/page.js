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
  const pb = new PocketBase('http://172.16.15.141:8080');
  const [dane, setDane] = useState(null)

  const zmienDost = (e)=>{
    console.log(e)
  }

  useEffect(()=>{
    const getData = async()=>{
      try{
        const records = await pb.collection('gry').getFullList()
        setDane(records)
        console.log(records)
      } catch(err){
        console.log(err)
      } finally{

      }
    }
    getData()
  }, [])
  return (
    <div className="w-full h-screen flex flex-row flex-wrap">
      {dane &&
      <Card>
        <CardHeader>
          <CardTitle>{dane[0].nazwa}</CardTitle>
          <CardDescription>{dane[0].cena}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{dane[0].opis}</p>
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
            checked={dane[0].dostepnosc}
            onCheckedChange={(e) => zmienDost(e.target)}
          />
        </CardFooter>
      </Card>
      }
    </div>
  );
}
