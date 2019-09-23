<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    protected function getTasks(){
        return Task::where('user_id', Auth::user()->id)->orderBy('status', 'asc')->get();
    }

    public function index()
    {
        $task = self::getTasks();

        return   response() ->json([
            'status'=>'success',
            'data' => $task
        ]);
    }

    //Создание новой записи
    public function create(Request $request)
    {
        $task = new Task();
        $task->user_id = Auth::user()->id;
        $task->text = $request->text;
        $task->save();
        return response()->json(['status' => 'success',
            'data' => self::getTasks()]);
    }

    public function updateStatus(Request $request){
        $task = Task::find($request->id);
        $task->status = !$request->status;
        $task->save();
        return response()->json(['status' => 'success',
            'data' => self::getTasks()]);
    }

    //Обновление записи
    public function update(Request $request)
    {
        $task = Task::find($request->id);
        $task->text = $request->text;
        $task->save();
        return response()->json(['status' => 'success']);
    }

    //Удаление записи
    public function destroy(Request $request)
    {
        $task = Task::find($request->id);
        $task->delete();
        return response()->json(['status' => 'success']);
    }
}
