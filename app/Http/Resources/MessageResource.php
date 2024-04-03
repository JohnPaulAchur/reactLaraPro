<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $date = new DateTime($this->created_at);
        return [
            'id'=>$this->id,
            'message'=>$this->message,
            'user_id'=>$this->user_id,
            'date'=>$date->format('Y-m-d'),
            'time'=>$date->format('H:i A'),
            'sender_fullname'=>$this->sender_fullname?$this->sender_fullname:null,
        ];
    }
}
