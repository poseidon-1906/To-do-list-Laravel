import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardContent to imports
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from "@/layouts/app-layout"; // Corrected import from appLayout to AppLayout
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Corrected path for Textarea
import { useForm } from '@inertiajs/react';

interface List {
    id: number;
    title: string;
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
        href: '/lists',
    },
];

export default function ListsIndex({ lists, flash }: Props) { // Corrected syntax for destructuring props
    const [isOpen, setIsOpen] = useState(false);
    const [editingList, setEditingList] = useState<List | null>(null); // Corrected typo: setEdittingList to setEditingList
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true); // Changed to true to show error toast
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingList) {
            put(route('lists.update', editingList.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingList(null); // Corrected typo: setEdittingList to setEditingList
                },
            });
        } else {
            post(route('lists.store'), { // Corrected route: listss.store to lists.store
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (list: List) => {
        setEditingList(list); // Corrected typo: setEdittingList to setEditingList
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showToast && (
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${ // Corrected template literal syntax and gab to gap
                        toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}
                        text-white animate-in fade-in slide-in-from-top-5`}>
                        {toastType === 'success' ? (
                            <CheckCircle2 className="h-5 w-5" />) : (
                            <XCircle className="h-5 w-5" />
                        )} {/* Moved <span> inside the conditional rendering */}
                        <span>{toastMessage}</span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lists</h1>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}> {/* Corrected onOpenChanges to onOpenChange and moved closing tag */}
                        <DialogTrigger asChild>
                            <Button onClick={() => setEditingList(null)}> {/* Added onClick to clear editingList when opening for new list */}
                                <Plus className="h-4 w-4 mr-2" />
                                New List
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader> {/* DialogTitle should be inside DialogHeader or directly under DialogContent, not wrapping Header */}
                                <DialogTitle>{editingList ? 'Edit List' : 'Create List'}</DialogTitle> {/* Corrected typo Creat to Create */}
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title} // Corrected value from DataTransfer.title to data.title
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2"> {/* Added div for description input */}
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </div>
                                <Button type="submit" disabled={processing}>{editingList ? 'Update' : 'Create'}</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lists.map((list) => (
                        <Card key={list.id} className="hover:bg-accent/50 transition-colors">
                            <Link href={route('lists.show', list.id)}> {/* Added Link to card for navigation */}
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">{list.title}</CardTitle>
                                </CardHeader>
                                <CardContent> {/* Added CardContent for description and task count */}
                                    <p className="text-sm text-muted-foreground">
                                        {list.description || 'No Description'}
                                    </p>
                                    {list.tasks_count !== undefined && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                            {list.tasks_count} tasks
                                        </p>
                                    )}
                                </CardContent>
                            </Link>
                            <div className="flex gap-2 p-4 pt-0"> {/* Moved buttons outside of CardContent and added padding */}
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(list)}> {/* Corrected onclick to onClick */}
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(list.id)} className="text-destructive hover:text-destructive/90"> {/* Corrected onclick to onClick */}
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}