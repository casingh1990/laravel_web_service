<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Video;
use Storage;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $user = Auth::guard('api')->user();

      //$user_id = Auth::id();
      $user_id = $user->id;

      $videos = Video::where('user', $user_id)->get();
//      return view('videos/index', array('videos' => $videos));
      return response()->json($videos);
    }

    public function getVideo($path){
      $url = Storage::url($path);
      echo Storage::get("video/" . $path);exit();
      return $url;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      $id = Auth::id();
      $tpl_vars = array(
        'user_id' => $id,
      );

        return view('videos/create', $tpl_vars);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $user_id = $request->get('user');

      $user_file = $request->file('video');

      $path = $request->file('video')->store('public/video');

      $db_file = new Video(
        [
          'user' => $user_id,
          'name' => $user_file->getClientOriginalName(),
          'file' => $path,
        ]
      );

      $db_file->save();

      return response()->json($db_file);
      //return response()->json(array("status"=>"successful", "file" => $file_contents));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
