export function buildNetlifyFormData(
  formName: string,
  values: Record<string, any>,
) {
  const fd = new FormData();
  fd.set("form-name", formName);
  fd.set("bot-field", "");

  Object.entries(values).forEach(([key, val]) => {
    if (val == null) return;

    // Files (File or File[])
    if (val instanceof File) {
      fd.append(key, val);
      return;
    }
    if (Array.isArray(val) && val.length && val[0] instanceof File) {
      (val as File[]).forEach((f) => fd.append(key, f));
      return;
    }

    // Arrays of primitives
    if (Array.isArray(val)) {
      val.forEach((item) => fd.append(`${key}[]`, String(item)));
      return;
    }

    // Primitives
    fd.append(key, String(val));
  });

  return fd;
}

export async function submitToNetlify(
  formName: string,
  values: Record<string, any>,
  redirectTo?: string,
) {
  const fd = buildNetlifyFormData(formName, values);
  const res = await fetch("/", { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Netlify form submit failed: ${res.status}`);
  if (redirectTo) window.location.href = redirectTo;
}
