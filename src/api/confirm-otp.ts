export type ConfirmOtpPayload = {
  otp: string;
};

export const confirmOtp = async (payload: ConfirmOtpPayload) => {
  const response = await fetch('/confirm-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Invalid OTP');
  }
  return data as { message?: string };
};
