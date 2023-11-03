import { ProfileForm } from "./ProfileForm";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
export default async function SettingsPage() {
    const user = await fetchCurrentUser();

    return <ProfileForm user={user} />;
}
