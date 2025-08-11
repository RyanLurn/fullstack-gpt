import { ThemePreference } from "@/features/auth/components/user-profile/tabs/preferences/theme";
import { TAB_TITLE_CLASS_NAME } from "@/features/auth/lib/constants";

function PreferencesTab() {
  return (
    <>
      <h1 className={TAB_TITLE_CLASS_NAME}>Preferences</h1>
      <ThemePreference />
    </>
  );
}

export { PreferencesTab };
