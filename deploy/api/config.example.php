<?php
/**
 * Copy this file to config.local.php on the server and edit the values.
 * Do not commit config.local.php.
 */

return [
  // Where audit form emails are delivered
  'recipient' => 'info@arsyconsulting.com',

  // Must be an address on your domain once mail is set up in cPanel
  'from_email' => 'noreply@arsyconsulting.com',
  'from_name' => 'Arsy Audit Form',

  // Optional: Resend API key (https://resend.com). If set, used instead of PHP mail().
  'resend_api_key' => '',
];
