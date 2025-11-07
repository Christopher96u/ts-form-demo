export type UpdateOrderPayload = Record<string, unknown>;

export const updateOrder = async (payload: UpdateOrderPayload) => {
  const response = await fetch('/update-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? 'Unable to update order');
  }

  return data as { message?: string; [key: string]: unknown };
};
