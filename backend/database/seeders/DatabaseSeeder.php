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
            'name' => 'Test User',
            'email' => 'zombieatmeat@gmail.com',
         ]);
    }
}
