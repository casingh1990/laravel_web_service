<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/videos';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function apilogin(Request $request)
    {
      $all = $request->all();

        //$this->validateLogin($request);
//echo "reached here";exit();
        //if ($this->attemptLogin($request)) {
        if (Auth::attempt($all)){
            $user = $this->guard()->user();
            $user->generateToken();

            return response()->json($user);
        }else{
          echo "login Failed<br />";
        }

        return $this->sendFailedLoginResponse($request);
    }
}
