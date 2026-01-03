<?php

namespace Database\Seeders;
Use App\Models\User;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
   public function run()
{
     User::factory(10)->create([
        'ho_ten' => 'Test User', // Changed 'name'
        'email' => 'test@gmail.com',
        'mat_khau' => '123'      // Changed 'password'
     ]);
}
}
