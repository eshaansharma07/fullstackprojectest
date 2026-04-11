export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="glass rounded-[36px] p-8">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="mt-5 leading-8 text-slate-600">
          EventSphere stores only the data required to manage accounts, registrations, event operations, notifications,
          and analytics. Sensitive values such as passwords are hashed, JWT secrets are stored in environment variables,
          and media uploads can be managed through Cloudinary.
        </p>
      </div>
    </div>
  );
}
