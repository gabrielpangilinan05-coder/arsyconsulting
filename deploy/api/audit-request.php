<?php
/**
 * Contact / audit form endpoint for cPanel shared hosting.
 * Accepts JSON POST (same shape as the Next.js /api/audit-request route).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
  exit;
}

function respond(int $status, array $payload): void
{
  http_response_code($status);
  echo json_encode($payload);
  exit;
}

function escape_html($value): string
{
  return htmlspecialchars((string) ($value ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$configPath = __DIR__ . '/config.local.php';
$config = [
  'recipient' => 'info@arsyconsulting.com',
  'from_email' => 'noreply@arsyconsulting.com',
  'from_name' => 'Arsy Audit Form',
  'resend_api_key' => '',
];

if (is_readable($configPath)) {
  $loaded = require $configPath;
  if (is_array($loaded)) {
    $config = array_merge($config, $loaded);
  }
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '{}', true);
if (!is_array($body)) {
  respond(400, ['success' => false, 'error' => 'Invalid JSON body.']);
}

$fullName = trim((string) ($body['fullName'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$phone = trim((string) ($body['phone'] ?? ''));
$company = trim((string) ($body['company'] ?? ''));
$location = trim((string) ($body['location'] ?? ''));
$challenge = trim((string) ($body['challenge'] ?? ''));
$consentNonMarketing = !empty($body['consentNonMarketing']);
$consentMarketing = !empty($body['consentMarketing']);
$agreedToTerms = !empty($body['agreedToTerms']);
$discoveryCall = $body['discoveryCall'] ?? null;

if ($fullName === '' || $email === '') {
  respond(400, ['success' => false, 'error' => 'Full name and business email are required.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(400, ['success' => false, 'error' => 'Please provide a valid business email.']);
}

if (!$agreedToTerms) {
  respond(400, ['success' => false, 'error' => 'Please agree to the Privacy Policy and Terms and Conditions.']);
}

$discoveryHtml = '<p><strong>Discovery Call:</strong> Not scheduled</p>';
if (is_array($discoveryCall) && !empty($discoveryCall['display']) && !empty($discoveryCall['time'])) {
  $discoveryHtml = '<p><strong>Discovery Call:</strong> '
    . escape_html($discoveryCall['display'])
    . ' at '
    . escape_html($discoveryCall['time'])
    . '</p>';
}

$subject = 'New Audit Request - Arsy Consulting';
$html = '<div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">'
  . '<h2 style="margin: 0 0 16px; color: #059669;">New Audit Request Submission</h2>'
  . '<p><strong>Full Name:</strong> ' . escape_html($fullName) . '</p>'
  . '<p><strong>Business Email:</strong> ' . escape_html($email) . '</p>'
  . '<p><strong>Phone Number:</strong> ' . escape_html($phone !== '' ? $phone : '—') . '</p>'
  . '<p><strong>Company Name:</strong> ' . escape_html($company !== '' ? $company : '—') . '</p>'
  . '<p><strong>Plant / Facility Location:</strong> ' . escape_html($location !== '' ? $location : '—') . '</p>'
  . $discoveryHtml
  . '<p><strong>Main Operational Challenge:</strong></p>'
  . '<blockquote style="background: #f1f5f9; padding: 12px 14px; border-left: 4px solid #059669; margin: 8px 0 0; white-space: pre-wrap;">'
  . escape_html($challenge !== '' ? $challenge : '—')
  . '</blockquote>'
  . '<p style="margin-top: 16px;"><strong>SMS Consent (Non-marketing):</strong> ' . ($consentNonMarketing ? 'Yes' : 'No') . '</p>'
  . '<p><strong>SMS Consent (Marketing):</strong> ' . ($consentMarketing ? 'Yes' : 'No') . '</p>'
  . '<p><strong>Privacy Policy &amp; Terms:</strong> ' . ($agreedToTerms ? 'Agreed' : 'No') . '</p>'
  . '</div>';

$resendKey = trim((string) ($config['resend_api_key'] ?? ''));
$recipient = (string) $config['recipient'];
$fromEmail = (string) $config['from_email'];
$fromName = (string) $config['from_name'];

if ($resendKey !== '') {
  $payload = json_encode([
    'from' => $fromName . ' <' . $fromEmail . '>',
    'to' => [$recipient],
    'reply_to' => $email,
    'subject' => $subject,
    'html' => $html,
  ]);

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
      'Authorization: Bearer ' . $resendKey,
      'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 20,
  ]);
  $responseBody = curl_exec($ch);
  $curlError = curl_error($ch);
  $statusCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($responseBody === false) {
    respond(500, ['success' => false, 'error' => 'Email service unreachable: ' . $curlError]);
  }

  $decoded = json_decode($responseBody, true);
  if ($statusCode < 200 || $statusCode >= 300) {
    $message = is_array($decoded) && isset($decoded['message'])
      ? (string) $decoded['message']
      : 'Failed to send email.';
    respond(500, ['success' => false, 'error' => $message]);
  }

  respond(200, ['success' => true, 'data' => $decoded]);
}

$headers = [
  'MIME-Version: 1.0',
  'Content-type: text/html; charset=utf-8',
  'From: ' . sprintf('%s <%s>', $fromName, $fromEmail),
  'Reply-To: ' . $email,
  'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($recipient, $subject, $html, implode("\r\n", $headers));

if (!$sent) {
  respond(500, [
    'success' => false,
    'error' => 'Failed to send email. Create api/config.local.php or enable mail() in cPanel.',
  ]);
}

respond(200, ['success' => true]);
