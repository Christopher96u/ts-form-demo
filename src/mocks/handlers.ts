import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/update-order', async ({ request }) => {
    await delay(1500);
    const payload = await request.json().catch(() => ({}));
    return HttpResponse.json({
      message: 'Order updated successfully',
      received: payload,
      timestamp: Date.now(),
    });
  }),
  http.post('/send-otp', async ({ request }) => {
    await delay(1500);
    const body = (await request.json().catch(() => null)) as { mobileNumber?: unknown } | null;
    if (!body?.mobileNumber || typeof body.mobileNumber !== 'string') {
      return HttpResponse.json({ message: 'Enter your current mobile number before sending the OTP' }, { status: 400 });
    }
    return HttpResponse.json({ message: 'OTP sent successfully' });
  }),
  http.post('/confirm-otp', async ({ request }) => {
    await delay(1500);
    const body = (await request.json().catch(() => null)) as { otp?: unknown } | null;
    if (!body?.otp || typeof body.otp !== 'string' || body.otp !== '1111') {
      return HttpResponse.json({ message: 'Invalid OTP code' }, { status: 400 });
    }
    return HttpResponse.json({ message: 'OTP confirmed successfully' });
  }),
  http.post('/available-numbers', async () => {
    await delay(1500);
    const numbers = Array.from({ length: 10 }, (_, idx) => `0400 000 ${String(idx + 1).padStart(3, '0')}`);
    return HttpResponse.json({ numbers });
  }),
];
