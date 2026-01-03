<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
{
    return [
        'ho_ten' => $this->faker->name, // Changed 'name'
        'email' => $this->faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'mat_khau' => '123', // Changed 'password', kept plain text as per your controller logic
        'vai_tro' => 'customer',
        'remember_token' => Str::random(10),
        'ngay_tao' => now(),
        'ngay_cap_nhat' => now(),
    ];
}
}
