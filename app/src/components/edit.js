'use client'

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
  import { useState, useEffect } from "react";
  import Image from "next/image";
  import PocketBase from 'pocketbase';
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function EditItem({items, onupdated}){

    const [dane, setDane] = useState({nazwa: items.nazwa, cena: items.cena, opis: items.opis})
    const [zdjecie, setZdjecie] = useState(null)

    const pb = new PocketBase('http://172.16.15.141:8080');

    const handleInputChange = (id, e)=>{
        setDane((prev)=>({
            ...prev,
            [id]: e.target.value
        }))
        console.log(dane)
    }

    const handleZdjecia = (e)=>{
        setZdjecie(e.target.files[0])
    }

    const update= async()=>{
        const formData = new FormData()

        formData.append('nazwa', dane.nazwa)
        formData.append('cena', dane.cena)
        formData.append('opis', dane.opis)
        formData.append('dostepnosc', false)
        formData.append('zdjecie', zdjecie)

        const record = await pb.collection('gry').update(items.id, formData);

        onupdated(record)
    }

    const handleCheckBox = (e) =>{
        setDane((prev)=>({
            ...prev,
            dostepnosc: e.target.checked
        }))
    }


    return(
        <Dialog>
            <DialogTrigger>EDIT</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>EDYCJA</DialogTitle>
                </DialogHeader>
                <Input defaultValue={items.nazwa}  placeholder='nazwa' id='nazwa' onChange={(e)=>handleInputChange('nazwa', e)}/>
                <Input defaultValue={items.cena}  type='number' placeholder='cena' id='cena' onChange={(e)=>handleInputChange('cena', e)}/>
                <Input defaultValue={items.opis}  placeholder='opis' id='opis' onChange={(e)=>handleInputChange('opis', e)}/>
                <Input type='checkbox' checked={items.dostepnosc} placeholder='dostepnosc' id='dostepnosc' onChange={(e)=> handleCheckBox(e)}/>
                <Input type='file' id='zdjecie' onChange={(e)=>handleZdjecia(e)}/>

                <DialogClose asChild>
                    <Button onClick={update}>Zmień</Button>
                </DialogClose>

                <DialogClose>Anuluj</DialogClose>
            </DialogContent>
        </Dialog>
    )
}