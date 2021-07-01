<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CloudContributor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CloudContributorsController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "fullname" => 'required|min:4|max:250',
            "mobile" => 'required|numeric|regex:/(09)[0-9]{9}/|digits:11',
            "email" => 'required|email|max:800',
            "resume" => 'required|file|mimes:pdf|max:1024',
            "portfolio" => 'nullable|file|mimes:pdf|max:1024',
            "company" => 'nullable|max:250',
            "contributors_type" => [
                'nullable',
                Rule::in(["type-1", "type-2", "type-3", "type-4", "type-5"])
            ],
            "contributors_level" => [
                'nullable',
                Rule::in(["level-1", "level-2", "level-3", "level-4"])
            ],
            "description" => 'nullable|max:800',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "data" => $validator->errors()
            ]);
        }

        $resumeImagePath = $this->uploadFile($request->file("resume"));
        if ($portfolio = $request->file("portfolio")) $portfolioImagePath = $this->uploadFile($portfolio);

        CloudContributor::create(array_merge($request->all(), [
            "resume" => $resumeImagePath,
            "portfolio" => $portfolioImagePath ?? null,
        ]));

        return response()->json([
            'status' => true,
        ], 201);
    }

    private function uploadFile($file): string
    {
        $now = Carbon::now();
        $imagePath = "/uploads/files/{$now->year}/{$now->month}/$now->day";
        $fileName = \Str::random(8) . "-" . $file->getClientOriginalName();
        $file->move(public_path($imagePath), $fileName);
        return $imagePath;
    }
}
