<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50);  // Nombre del estudiante, máximo 50 caracteres
            $table->string('last_name', 50);  // Nombre del estudiante, máximo 50 caracteres
            $table->string('email')->unique();  // Correo electrónico único
            $table->string('phone')->nullable();  // Número de teléfono, puede ser nulo
            $table->date('birth_date');  // Fecha de nacimiento
            $table->date('enrollment_date');  // Fecha de inscripción
            $table->enum('status', ['Activo', 'Inactivo'])->default('Activo');  // Estado del estudiante
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student');
    }
};
