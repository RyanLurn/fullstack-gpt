import { Separator } from "@/components/ui/separator";
import { TAB_TITLE_CLASS_NAME } from "@/features/auth/lib/constants";

function PreferencesTab() {
  return (
    <>
      <h1 className={TAB_TITLE_CLASS_NAME}>Preferences</h1>
      <Separator className="my-4" />
    </>
  );
}

export { PreferencesTab };
