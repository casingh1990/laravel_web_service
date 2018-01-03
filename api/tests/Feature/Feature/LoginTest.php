<?php

namespace Tests\Feature\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
  private $api_url = "backend/api/";

  public function testRequiresEmailAndLogin()
  {
    $test_url = $this->api_url . "apilogin";
      $this->json('POST', $test_url)
          ->assertStatus(422)
          ->assertJson([
              'email' => ['The email field is required.'],
              'password' => ['The password field is required.'],
          ]);
  }


  public function testUserLoginsSuccessfully()
  {
    $test_url = $this->api_url . "apilogin";
      $user = factory(User::class)->create([
          'email' => 'testlogin@user.com',
          'password' => bcrypt('toptal123'),
      ]);

      $payload = ['email' => 'testlogin@user.com', 'password' => 'toptal123'];

      $this->json('POST', $test_url, $payload)
          ->assertStatus(200)
          ->assertJsonStructure([
              'data' => [
                  'id',
                  'name',
                  'email',
                  'created_at',
                  'updated_at',
                  'api_token',
              ],
          ]);

  }
}
