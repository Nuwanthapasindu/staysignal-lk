import AuthLayout, { AuthAside } from '../components/AuthLayout';
import SignupOwnerForm from '../components/SignupOwnerForm';

export default function SignupOwnerPage() {
  return (
    <AuthLayout
      eyebrow="Civic registry"
      title="Register your guesthouse or transport desk"
      intro="List your stay on the verified community corridor ledger and start relaying road, water and power status to travellers."
      aside={
        <AuthAside
          spec="REGISTRY PROTOCOL 2024.08"
          heading="Why register your property?"
          body="During monsoon roadslips and valley power cuts, centralised booking portals freeze or trigger blanket cancellations. StaySignal gives hill-country hosts a direct channel to drivers and stranded guests."
          points={[
            { title: 'Stop panic cancellations', text: 'Update transport drivers directly before rumours spread.' },
            { title: 'One desk, your whole team', text: 'Post, edit and resolve notices for your stay from any device.' },
          ]}
          stat={{ value: '28 properties online', label: 'Ramboda · Ella Gap' }}
        />
      }
    >
      <SignupOwnerForm />
    </AuthLayout>
  );
}
