<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NotCommonPassword implements Rule
{
    public function passes($attribute, $value)
    {
        // List of common passwords to blacklist
        $commonPasswords = [
            'password',
            '12345678',
            'passkey',
            'passcode',
        ];

        // Check if the provided password is not in the list of common passwords
        return !in_array(strtolower($value), $commonPasswords);
    }

    public function message()
    {
        return 'The :attribute is too common or guessable.';
    }
}
