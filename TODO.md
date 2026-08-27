# TODO

## Wire up enquiry email delivery

`src/app/enquiry/actions.ts` (`submitEnquiry`) validates every enquiry
submission but does not send or store it anywhere yet — it only
`console.log`s the payload server-side. Nothing is persisted to a database.

When ready, wire up real delivery using **Brevo** or **Resend** (whichever
turns out best):

- Send the validated `enquiry` object (name, email, phone, company, message)
  as an email to `GROUP_EMAIL` from inside `submitEnquiry`.
- Add the provider's API key as an env var (e.g. `RESEND_API_KEY` /
  `BREVO_API_KEY`) — never commit it.
- Keep the existing validation, honeypot check, and WhatsApp redirect
  behavior as they are; only the delivery step needs to be added.
- Still no database/storage needed for the form — email delivery only.
