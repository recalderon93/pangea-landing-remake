import { z } from "zod";
import { t, type Locale } from "@/i18n";

export const getContactUsFormValidator = (locale: Locale) =>
  z.object({
    fullName: z
      .string({
        message: t(locale, "contact-us.errors.required.fullName"),
      })
      .min(2, t(locale, "contact-us.errors.fullName-length")),
    companyName: z.string().optional(),
    email: z
      .string({
        message: t(locale, "contact-us.errors.required.email"),
      })
      .email(t(locale, "contact-us.errors.email-format")),
    sector: z.string({
      message: t(locale, "contact-us.errors.required.sector"),
    }),
    contactReason: z.string({
      message: t(locale, "contact-us.errors.required.contact-reason"),
    }),
    projectType: z.string({
      message: t(locale, "contact-us.errors.required.project-type"),
    }),
    timeline: z.string({
      message: t(locale, "contact-us.errors.required.timeline"),
    }),
    needs: z.string({
      message: t(locale, "contact-us.errors.required.needs"),
    }),
    duration: z.string({
      message: t(locale, "contact-us.errors.required.duration"),
    }),
    teamFit: z.string({
      message: t(locale, "contact-us.errors.required.team-fit"),
    }),
    location: z.string().optional(),
    // attachments: z.array(FileSchema).optional(),
    attachments: z
      .array(z.instanceof(File))
      .max(5, t(locale, "contact-us.errors.files-count")) // optional, if you want a count limit
      .optional()
      .refine(
        (files) => {
          return files
            ? files.every((file) => file.size <= 10 * 1024 * 1024)
            : true;
        },
        { message: t(locale, "contact-us.errors.file-size") },
      ),
  });

export const ContactUsFormValidator = getContactUsFormValidator("en");

export type ContactUsFormType = z.infer<typeof ContactUsFormValidator>;
