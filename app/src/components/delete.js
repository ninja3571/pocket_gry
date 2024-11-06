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

import PocketBase from 'pocketbase';
import { Button } from "./ui/button";

export default function Delete({id, ondeleted}){

    const pb = new PocketBase('http://172.16.15.141:8080');

    const del = async()=>{
        try{
            await pb.collection('gry').delete(id);
            ondeleted(id)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <Dialog>
            <DialogTrigger>DELETE</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Czy na pewno chcesz usunąć?</DialogTitle>
                    <DialogDescription>
                        Ta akcja jest nie odwracalna. Usuniętego elementu nie da się przywrócić 
                    </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <Button onClick={del}>Usuń</Button>
                </DialogClose>
                <DialogClose>Anuluj</DialogClose>
            </DialogContent>
        </Dialog>
    )
}