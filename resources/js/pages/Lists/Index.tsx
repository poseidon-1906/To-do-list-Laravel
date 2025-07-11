import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import{Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import{Plus, Pencil, Trash2, CheckCircle2, XCircle} from 'lucide-react';
import{Link} from '@inertiajs/react';
import appLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@headlessui/react";
import{useForm} from '@inertiajs/react';
import AppLayout from "@/layouts/app-layout";

interface List {
    id: number;
    title:string;
    description: string | null;
    tasks_count?: number;

}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;

    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lists',
        href:'/lists',
    },
];

export default function ListsIndex ({ lists, flash}; Props) {
    const[isOpen, setIsOpen] = useState(false);
    const[editingList, setEdittingList] = useState<List | null>(null);
    const[showToast, setShowToast] = useState(false);
    const[toastMessage, setToastMessage] = useState('');
    const[toastType, setToastType] = useState<'success'| 'error'>('success');

    useEffect(() => {
    if (flash?.success){
        setToastMessage(flash.success);
        setToastType('success');
        setShowToast(true);
    } else if (flash?.error) {
        setToastMessage(flash.error);
        setToastType('error');
        setShowToast(false);
    }
}, [flash]);

    useEffect(() =>{
        if(showToast){
            const timer = setTimeout(() => {
                setShowToast(false);

            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);
        const {data, setData, post, put, processing, reset, delete: destroy } = useForm({
            title: '',
            description: '',
        });

         const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if(editingList){
                put(route('lists.update', editingList.id),{
                    onSuccess: () => {
                        setIsOpen(false);
                        reset();
                        setEdittingList(null);
                    },
                });
            } else {
                post(route('listss.store'),{
                    onSuccess: () => {
                        setIsOpen(false);
                        reset();
                    },
                });
            }
         };
         const handleEdit = (list: List) => {
            setEdittingList(list);
            setData({
                title: list.title,
                description: list.description || '',
            });
            setIsOpen(true);
         }; 
         const handleDelete = (listId: number) => {
            destroy(route('lists.destroy', listId));          
         };
         return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Lists" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"
         )
}


