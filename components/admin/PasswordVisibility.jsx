import { PasswordToggles } from "./PasswordToggles";

export function PasswordVisibilityProvider({ children }) {
  return (
    <>
      {children}
      <PasswordToggles />
    </>
  );
}
