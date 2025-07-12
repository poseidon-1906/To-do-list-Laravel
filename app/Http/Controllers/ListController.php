<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TaskList; // Assurez-vous que TaskList est bien votre modèle pour les listes

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // On récupère les listes de l'utilisateur authentifié avec le nombre de tâches (pour l'affichage)
        $lists = TaskList::where('user_id', auth()->id())->get();

        return Inertia::render('Lists/Index', [
            'lists' => $lists,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Cette méthode est souvent vide pour les ressources gérées via Inertia modales/formulaires en ligne
        // Si vous avez une page de création séparée, vous la rendriez ici.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string', // CORRECTION ICI : 'null' est devenu 'nullable'
        ]);

        TaskList::create([
            ...$validated,
            'user_id' => auth()->id()
        ]);

        return redirect()->route('lists.index')->with('success', 'List Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Pour afficher une liste spécifique et ses tâches
        // $list = TaskList::with('tasks')->findOrFail($id);
        // return Inertia::render('Lists/Show', ['list' => $list]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Similaire à create(), souvent géré via modal
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskList $list) // Le paramètre est $list (instance de TaskList)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string', // CORRECTION ICI : 'null' est devenu 'nullable'
        ]);

        $list->update($validated); // Utilisez l'instance $list directement

        return redirect()->route('lists.index')->with('success', 'List Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $list) // Le paramètre est $list (instance de TaskList)
    {
        $list->delete();

        // Correction du message flash pour qu'il soit correctement reconnu par Inertia
        return redirect()->route('lists.index')->with('success', 'List Deleted Successfully');
    }
}