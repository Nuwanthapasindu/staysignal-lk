import SignupForm from './SignupForm';
import { signupOwnerSchema } from '../validation';

export default function SignupOwnerForm() {
  return (
    <SignupForm
      role="owner"
      schema={signupOwnerSchema}
      phoneRequired
      eyebrow="Form ST-2024-REG"
      title="Register your Stay or Desk"
      intro="Join the verified community corridor ledger. Zero setup fees, zero booking commissions."
      note="You will post road / water / power notices for your stay."
      cta="Create owner account"
    />
  );
}
