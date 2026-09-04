import AuthLayout, { AuthAside } from '../components/AuthLayout';
import SignupTravellerForm from '../components/SignupTravellerForm';

export default function SignupTravellerPage() {
  return (
    <AuthLayout
      eyebrow="Traveller registry"
      title="Follow the corridors you're travelling"
      intro="Create a free traveller account to track road closures, water and power disruptions, and safe alternates along your route."
      aside={
        <AuthAside
          spec="FORM TR-2024"
          heading="Why travellers sign up"
          body="Browsing notices is open to everyone. An account lets you save routes and see updates for the towns and passes on your itinerary."
          points={[
            { title: 'Real corridor status', text: 'Human-verified reports from local guesthouse desks, not social-media rumours.' },
            { title: 'No booking commissions', text: 'StaySignal is an operational board, not an OTA.' },
          ]}
          stat={{ value: 'Free', label: 'No card required' }}
        />
      }
    >
      <SignupTravellerForm />
    </AuthLayout>
  );
}
