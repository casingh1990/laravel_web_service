<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
  /**
   * Store a newly created resource in storage
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   **/
   public function store(Request $request){
     $item = new Item([
       'name' => $request->get('name'),
       'price' => $request->get('price')
     ]);
     $item->save();
     return response()->json('Successfully added');
   }
}
