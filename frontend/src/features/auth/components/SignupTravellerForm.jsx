import SignupForm from './SignupForm';
import { signupTravellerSchema } from '../validation';

export default function SignupTravellerForm() {
  return (
    <SignupForm
      role="traveller"
      schema={signupTravellerSchema}
      phoneRequired={false}
      eyebrow="Traveller access"
      title="Create traveller account"
      intro="Follow corridor status and stay disruptions along your route. Free, no booking commissions."
      cta="Create traveller account"
    />
  );
}
