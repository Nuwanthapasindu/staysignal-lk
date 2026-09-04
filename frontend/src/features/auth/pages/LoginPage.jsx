import AuthLayout, { AuthAside } from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Estate desk operational portal"
      title="Authenticate operator terminal"
      intro="Clearance for guesthouse proprietors, plantation bungalows, and hill-country transport marshals to relay corridor status."
      aside={
        <AuthAside
          spec="SPEC-2024.B"
          heading="One account for your whole desk."
          body="StaySignal signs in accommodation hosts with an email and password so you can broadcast road, water and power notices to drivers and incoming guests."
          points={[
            { title: 'Built for the field', text: 'Post disruption notices from anywhere — the guest-facing board updates instantly.' },
            { title: 'Traveller or owner', text: 'Travellers browse notices for free; owners get a desk to post and resolve them.' },
          ]}
          stat={{ value: '340+ hill desks', label: 'Badulla · Nuwara Eliya' }}
        />
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
