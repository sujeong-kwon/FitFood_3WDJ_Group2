<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Review extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'review_id' =>$this->review_id,
            'review_title'=>$this->review_title,
            'review_message'=>$this->review_message,
            'review_image_route'=>$this->review_image_route,
            'review_star_rating'=>$this->review_star_rating,
            'user_id'=>$this->user_id,
            'store_id'=>$this->store_id
        ];
    }
}
