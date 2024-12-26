<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    // Obtener todos los estudiantes
    public function index()
    {
        $student = Student::all();
        return response()->json($student, 200);
    }

    // Obtener un estudiante por su ID
    public function show($id)
    {
        $student = Student::find($id);
        if ($student) {
            return response()->json($student, 200);
        } else {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }
    }

    // Crear un nuevo estudiante
    public function store(Request $request)
    {
        // Validación de los campos

        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'email' => 'required|email|unique:student',
            'phone' => 'required|digits:9', // Expresión regular para teléfono válido
            'birth_date' => 'required|required|date_format:Y-m-d|date| before_or_equal:today',
            'enrollment_date' => 'required|date',
            'status' => 'required|in:Activo,Inactivo',
        ]);
        if ($validator->fails()) {
            $data = [
                'messaje' => 'Error en validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }


        // Crear el nuevo estudiante
        $student = Student::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'birth_date' => $request->birth_date,
            'enrollment_date' => $request->enrollment_date,
            'status' => $request->status,
        ]);
        if (!$student) {
            $data = [
                'messaje' => 'Error al crear un nuevo estudiante',
                'errors' => $validator->errors(),
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        $data = [
            'student' => $student,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    // Actualizar un estudiante
    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

        // Validación de los campos
        $request->validate([
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'email' => 'required|email|unique:student',
            'phone' => 'required|digits:9', // Expresión regular para teléfono válido
            'birth_date' => 'required|required|date_format:Y-m-d|date| before_or_equal:today',
            'enrollment_date' => 'required|date',
            'status' => 'required|in:Activo,Inactivo',
        ]);

        // Actualizar el estudiante
        $student->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'birth_date' => $request->birth_date,
            'enrollment_date' => $request->enrollment_date,
            'status' => $request->status,
        ]);

        return response()->json($student);
    }

    // Eliminar un estudiante
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

        $student->delete();

        return response()->json(['message' => 'Estudiante eliminado']);
    }
    //Busca al estudiante por nombre o email
    public function searchStudent($name)
    {
        $student = Student::where('first_name', 'like', "%$name%")
            ->orWhere('email', 'like', "%{$name}%")->get();

        if (!$student) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

        return response()->json($student);
    }
}
