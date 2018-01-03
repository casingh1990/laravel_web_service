<?php

namespace App\Http\Controllers;

use App\Hero;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = false)
    {

      if ($id){
        return $this->getOne($id);
      }

      $items = Hero::all();

      $heroes = array();
      foreach($items as $hero){
        $heroes[] = [
          'id'=>$hero['id'],
          'name'=>$hero['name']
        ];
      }

      return response()->json($heroes);
    }

    public function getCSRFToken(){
      $token_array = array('token' => csrf_token());
      return response()->json($token_array);
    }

    public function getOne($id){
      $hero = Hero::find($id);
      return response()->json($hero);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $hero = new Hero([
        'name' => $request->get('name')
      ]);
      $hero->save();
      return response()->json($hero);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Hero  $hero
     * @return \Illuminate\Http\Response
     */
    public function show(Hero $hero)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Hero  $hero
     * @return \Illuminate\Http\Response
     */
    public function edit(Hero $hero)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hero  $hero
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Hero $hero = null)
    {
      if (!$hero){
        return response()->json('Error -> ID Must be set');
      }
      $hero->name = $request->get('name');
      $hero->update();
      return response()->json($hero);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Hero  $hero
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hero $hero)
    {
        $hero->delete();
        return response()->json('delete successful',200);
    }
}
