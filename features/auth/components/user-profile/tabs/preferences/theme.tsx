import { TabItemShell } from "@/features/auth/components/user-profile/tabs/item-shell";
import { ThemeSelect } from "@/features/auth/components/user-profile/tabs/preferences/theme-select";

function ThemePreference() {
  return (
    <TabItemShell itemName="Theme" isReverse>
      <ThemeSelect />
    </TabItemShell>
  );
}

export { ThemePreference };
