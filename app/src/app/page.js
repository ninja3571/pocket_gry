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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import Delete from "@/components/delete";
import EditItem from "@/components/edit"
import { Input } from "@/components/ui/input";

export default function Home() {
  const pb = new PocketBase('http://172.16.15.141:8080');
  // const pb = new PocketBase('http://192.168.60.16:8080');

  const [gry, setGry] = useState(null)
  const [dane, setDane] = useState({nazwa:null, cena:null, opis:null, dostepnosc:false})
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

  const handleCheckBox = (nazwaa, e) =>{
    setDane((prev)=>({
      ...prev,
      [nazwaa]: e.target.checked
    }))
  }

  const handleInputChange = (nazwaa, e) =>{
    setDane((prev)=>({
      ...prev,
      [nazwaa]: e.target.value
      
    }))
    console.log(dane)
  }

  const handleImage = (e)=>{
    console.log(e)
    setZdjecie(e.target.files[0])
  }

  const createGame = async()=>{
    const formData = new FormData()

    formData.append('nazwa', dane.nazwa)
    formData.append('cena', dane.cena)
    formData.append('opis', dane.opis)
    formData.append('dostepnosc', dane.dostepnosc)
    formData.append('zdjecie', zdjecie)

    try{ 
      const record = await pb.collection('gry').create(formData);
      setGry((prev)=>([
        ...prev,
        record
      ]))
    } catch(err){
      console.log(err)
    }
  }

  const deleted = (id)=>{
    setGry((prev)=>(
      prev.filter((el)=>{
        return el.id!= id
      })
    ))
  }

  const updated = (item)=>{
    var index = null
    var updGry = [...gry]
    for(let i in gry){
      if(gry[i].id == item.id){
        index=i
      }
    }
    updGry[index] == item
    setGry(updGry)
    console.log("index: "+ index)
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
            <CardContent className='w-[300px] flex flex-wrap'>
              <p>{item.opis}</p>
            </CardContent>
            <Image
                src={pb.files.getUrl(item, item.zdjecie)}
                alt={item.zdjecie}
                width={200}
                height={300} />
            <CardFooter className='flex gap-3 mt-3'>
              <DropdownMenu>
                <DropdownMenuTrigger>CHANGE</DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col gap-1'>
                  <DropdownMenuItem asChild>
                    <EditItem items={item} onupdated={updated}/>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Delete id={item.id} ondeleted={deleted}/>
                    </DropdownMenuItem>
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
        <Dialog>
          <DialogTrigger className="w-[350px] h-[500px] overflow-hidden"><h1 className="scale-[10] font-bold">+</h1></DialogTrigger>
          <DialogContent>
            <DialogTitle>
              NOWY ELEMENT
            </DialogTitle>
              <Input placeholder="nazwa" id='nazwa' onChange={(e)=> handleInputChange('nazwa', e)}></Input>
              <Input type='number' placeholder="cena" id='cena' onChange={(e)=> handleInputChange('cena', e)}></Input>
              <Input placeholder="opis" id='opis' onChange={(e)=> handleInputChange('opis', e)}></Input>
              <div className="inline-flex">
                <label className="ml-[90px] -mr-[150px]" for='dostepnosc'>Dostępne w sklepie</label>
                <Input type="checkbox" placeholder="dotepnosc" id='dostepne' onClick={(e)=>{handleCheckBox('dostepnosc', e), console.log(e)}}></Input>
              </div>
              <Input type="file" id="zdjecie" onChange={(e)=> handleImage(e)}></Input>
            <DialogClose >
              <Button onClick={createGame}>STWÓRZ</Button>
            </DialogClose>
            <DialogClose>
              <Button>Anuluj</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </Card>
      
    </div>
  );
}
